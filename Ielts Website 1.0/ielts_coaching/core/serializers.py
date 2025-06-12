# # 1.First Working
# from rest_framework import serializers
# from .models import User, RecordedClass, StudyMaterial, MockAssignment, Submission

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'role', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

# class RecordedClassSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecordedClass
#         fields = ['id', 'title', 'description', 'video_file', 'uploaded_by', 'uploaded_at']
#         read_only_fields = ['uploaded_by', 'uploaded_at']
# class StudyMaterialSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudyMaterial
#         fields = '__all__'

# class MockAssignmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MockAssignment
#         fields = '__all__'

# class SubmissionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Submission
#         fields = '__all__'

# # 3.Third
# from rest_framework import serializers
# from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', 'role']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ['id', 'title', 'description', 'created_at', 'created_by']

# class RecordedClassSerializer(serializers.ModelSerializer):
#     course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

#     class Meta:
#         model = RecordedClass
#         fields = ['id', 'title', 'description', 'video_file', 'uploaded_by', 'uploaded_at', 'course']
#         extra_kwargs = {'uploaded_by': {'read_only': True}}  # Mark as read-only

# class StudyMaterialSerializer(serializers.ModelSerializer):
#     course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

#     class Meta:
#         model = StudyMaterial
#         fields = ['id', 'title', 'description', 'file', 'uploaded_by', 'uploaded_at', 'course']
#         extra_kwargs = {'uploaded_by': {'read_only': True}}  # Mark as read-only

# class MockAssignmentSerializer(serializers.ModelSerializer):
#     course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

#     class Meta:
#         model = MockAssignment
#         fields = ['id', 'title', 'skill', 'description', 'created_by', 'created_at', 'course']
#         extra_kwargs = {'created_by': {'read_only': True}}  # Mark as read-only

# class SubmissionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Submission
#         fields = ['id', 'mock_assignment', 'student', 'submission_text', 'submission_file', 'submitted_at', 'ai_score', 'ai_feedback', 'teacher_score', 'teacher_feedback']
#         extra_kwargs = {'student': {'read_only': True}}  # Mark as read-only

# class StudentCourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudentCourse
#         fields = ['id', 'student', 'course', 'enrolled_at']

# 4.Fourth

from rest_framework import serializers
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse, CourseBundle, Module

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_role(self, value):
        valid_roles = [choice[0] for choice in User.ROLE_CHOICES]
        if value not in valid_roles:
            raise serializers.ValidationError(f"Role must be one of {valid_roles}")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'created_by']

class RecordedClassSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = RecordedClass
        fields = ['id', 'title', 'description', 'video_file', 'uploaded_by', 'uploaded_at', 'course', 'skill']
        extra_kwargs = {'uploaded_by': {'read_only': True}}  # Mark as read-only

class StudyMaterialSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = StudyMaterial
        fields = ['id', 'title', 'description', 'file', 'uploaded_by', 'uploaded_at', 'course', 'skill']
        extra_kwargs = {'uploaded_by': {'read_only': True}}  # Mark as read-only

class MockAssignmentSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = MockAssignment
        fields = ['id', 'title', 'skill', 'description', 'created_by', 'created_at', 'course']
        extra_kwargs = {'created_by': {'read_only': True}}  # Mark as read-only

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'mock_assignment', 'student', 'submission_text', 'submission_file', 'submitted_at', 'ai_score', 'ai_feedback', 'teacher_score', 'teacher_feedback']
        extra_kwargs = {'student': {'read_only': True}}  # Mark as read-only

class StudentCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = StudentCourse
        fields = ['id', 'student', 'course', 'enrolled_at']

class CourseBundleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    class Meta:
        model = CourseBundle
        fields = ['id', 'order', 'content_type', 'content', 'description']

    def get_content(self, obj):
        if obj.content_type == 'video':
            return RecordedClassSerializer(RecordedClass.objects.get(id=obj.content_id)).data
        elif obj.content_type == 'study_material':
            return StudyMaterialSerializer(StudyMaterial.objects.get(id=obj.content_id)).data
        elif obj.content_type == 'assignment':
            return MockAssignmentSerializer(MockAssignment.objects.get(id=obj.content_id)).data
        return None

class ModuleSerializer(serializers.ModelSerializer):
    bundles = CourseBundleSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'order', 'bundles']

