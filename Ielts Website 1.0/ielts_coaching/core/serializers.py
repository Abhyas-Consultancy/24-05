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

# from rest_framework import serializers
# from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse, Module, ModuleBundle
# from django.db import models
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', 'role']
#         extra_kwargs = {'password': {'write_only': True}}

#     def validate_role(self, value):
#         valid_roles = [choice[0] for choice in User.ROLE_CHOICES]
#         if value not in valid_roles:
#             raise serializers.ValidationError(f"Role must be one of {valid_roles}")
#         return value

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         # fields='__all__'
#         fields = ['id', 'title', 'description', 'created_at', 'created_by']

# class RecordedClassSerializer(serializers.ModelSerializer):
#     course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

#     class Meta:
#         model = RecordedClass
#         fields = ['id', 'title', 'description', 'video_file', 'uploaded_by', 'uploaded_at', 'course', 'skill']
#         extra_kwargs = {'uploaded_by': {'read_only': True}}  # Mark as read-only

# class StudyMaterialSerializer(serializers.ModelSerializer):
#     course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

#     class Meta:
#         model = StudyMaterial
#         fields = ['id', 'title', 'description', 'file', 'uploaded_by', 'uploaded_at', 'course', 'skill']
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
#     course = CourseSerializer(read_only=True)

#     class Meta:
#         model = StudentCourse
#         fields = ['id', 'student', 'course', 'enrolled_at']

# # class CourseBundleSerializer(serializers.ModelSerializer):
# #     content = serializers.SerializerMethodField()

# #     class Meta:
# #         model = CourseBundle
# #         fields = ['id', 'module', 'content_type', 'content_id', 'content', 'description']
# #         read_only_fields = ['content']
# #         extra_kwargs = {
# #             'module': {'write_only': True}
# #         }
   
# #     def get_content(self, obj):
# #         if obj.content_type == 'video':
# #             return RecordedClassSerializer(RecordedClass.objects.get(id=obj.content_id)).data
# #         elif obj.content_type == 'study_material':
# #             return StudyMaterialSerializer(StudyMaterial.objects.get(id=obj.content_id)).data
# #         elif obj.content_type == 'assignment':
# #             return MockAssignmentSerializer(MockAssignment.objects.get(id=obj.content_id)).data
# #         return None


# class CourseBundleSerializer(serializers.ModelSerializer):
#     content = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = ModuleBundle
#         fields = ['id', 'module', 'content_type', 'content_id', 'content', 'description']

#     def get_content(self, obj):
#         if obj.content_type == 'video':
#             return RecordedClassSerializer(RecordedClass.objects.get(id=obj.content_id)).data
#         elif obj.content_type == 'study_material':
#             return StudyMaterialSerializer(StudyMaterial.objects.get(id=obj.content_id)).data
#         elif obj.content_type == 'assignment':
#             return MockAssignmentSerializer(MockAssignment.objects.get(id=obj.content_id)).data
#         return None


# # class ModuleSerializer(serializers.ModelSerializer):
# #     bundles = CourseBundleSerializer(many=True, read_only=True)
# #     bundle_title = serializers.SerializerMethodField()

# #     class Meta:
# #         model = Module
# #         # fields = ['id', 'title', 'order', 'bundles']
# #         fields = ['id', 'order', 'bundle_type', 'bundle_id', 'description', 'sequence', 'bundle_title','bundles']

# #         # fields='__all__'
# #     def get_bundle_title(self, obj):
# #         if obj.bundle_type == 'video':
# #             return obj.bundle_video.title if obj.bundle_video else None
# #         elif obj.bundle_type == 'study_material':
# #             return obj.bundle_study_material.title if obj.bundle_study_material else None
# #         elif obj.bundle_type == 'assignment':
# #             return obj.bundle_assignment.title if obj.bundle_assignment else None
# #         return None


# class ModuleBundleSerializer(serializers.ModelSerializer):
#     content_title = serializers.SerializerMethodField()

#     class Meta:
#         model = ModuleBundle
#         fields = ['id', 'content_type', 'content_id', 'description', 'sequence', 'content_title']

#     def get_content_title(self, obj):
#         if obj.content_type == 'video':
#             video = RecordedClass.objects.filter(id=obj.content_id).first()
#             return video.title if video else ""
#         elif obj.content_type == 'study_material':
#             material = StudyMaterial.objects.filter(id=obj.content_id).first()
#             return material.title if material else ""
#         elif obj.content_type == 'assignment':
#             assignment = MockAssignment.objects.filter(id=obj.content_id).first()
#             return assignment.title if assignment else ""
#         return ""


from rest_framework import serializers
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse, Module, ModuleBundle
from django.db import models
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
        # fields='__all__'
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

# class CourseBundleSerializer(serializers.ModelSerializer):
#     content = serializers.SerializerMethodField()

#     class Meta:
#         model = CourseBundle
#         fields = ['id', 'module', 'content_type', 'content_id', 'content', 'description']
#         read_only_fields = ['content']
#         extra_kwargs = {
#             'module': {'write_only': True}
#         }
   
#     def get_content(self, obj):
#         if obj.content_type == 'video':
#             return RecordedClassSerializer(RecordedClass.objects.get(id=obj.content_id)).data
#         elif obj.content_type == 'study_material':
#             return StudyMaterialSerializer(StudyMaterial.objects.get(id=obj.content_id)).data
#         elif obj.content_type == 'assignment':
#             return MockAssignmentSerializer(MockAssignment.objects.get(id=obj.content_id)).data
#         return None


class CourseBundleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ModuleBundle
        fields = ['id', 'module', 'content_type', 'content_id', 'content', 'description']

    def get_content(self, obj):
        if obj.content_type == 'video':
            return RecordedClassSerializer(RecordedClass.objects.get(id=obj.content_id)).data
        elif obj.content_type == 'study_material':
            return StudyMaterialSerializer(StudyMaterial.objects.get(id=obj.content_id)).data
        elif obj.content_type == 'assignment':
            return MockAssignmentSerializer(MockAssignment.objects.get(id=obj.content_id)).data
        return None


# class ModuleSerializer(serializers.ModelSerializer):
#     bundles = CourseBundleSerializer(many=True, read_only=True)
#     bundle_title = serializers.SerializerMethodField()

#     class Meta:
#         model = Module
#         # fields = ['id', 'title', 'order', 'bundles']
#         fields = ['id', 'order', 'bundle_type', 'bundle_id', 'description', 'sequence', 'bundle_title','bundles']

#         # fields='__all__'
#     def get_bundle_title(self, obj):
#         if obj.bundle_type == 'video':
#             return obj.bundle_video.title if obj.bundle_video else None
#         elif obj.bundle_type == 'study_material':
#             return obj.bundle_study_material.title if obj.bundle_study_material else None
#         elif obj.bundle_type == 'assignment':
#             return obj.bundle_assignment.title if obj.bundle_assignment else None
#         return None



# class ModuleBundleSerializer(serializers.ModelSerializer):
#     content_title = serializers.SerializerMethodField()

#     class Meta:
#         model = ModuleBundle
#         fields = ['id', 'module', 'content_type', 'content_id', 'description', 'sequence', 'content_title']

#     def get_content_title(self, obj):
#         if obj.content_type == 'video':
#             video = RecordedClass.objects.filter(id=obj.content_id).first()
#             return video.title if video else ""
#         elif obj.content_type == 'study_material':
#             material = StudyMaterial.objects.filter(id=obj.content_id).first()
#             return material.title if material else ""
#         elif obj.content_type == 'assignment':
#             assignment = MockAssignment.objects.filter(id=obj.content_id).first()
#             return assignment.title if assignment else ""
#         return ""


# class ModuleBundleSerializer(serializers.ModelSerializer):
#     content_title = serializers.SerializerMethodField()

#     class Meta:
#         model = ModuleBundle
#         fields = ['id', 'content_type', 'content_id', 'description', 'sequence', 'content_title']

#     def get_content_title(self, obj):
#         if obj.content_type == 'video':
#             video = RecordedClass.objects.filter(id=obj.content_id).first()
#             return video.title if video else ""
#         elif obj.content_type == 'study_material':
#             material = StudyMaterial.objects.filter(id=obj.content_id).first()
#             return material.title if material else ""
#         elif obj.content_type == 'assignment':
#             assignment = MockAssignment.objects.filter(id=obj.content_id).first()
#             return assignment.title if assignment else ""
#         return ""


# class ModuleSerializer(serializers.ModelSerializer):
#     bundles = ModuleBundleSerializer(many=True, read_only=True)

#     class Meta:
#         model = Module
#         fields = ['id', 'title', 'order', 'bundles']

#     def create(self, validated_data):
#         return Module.objects.create(**validated_data)


# class ModuleSerializer(serializers.ModelSerializer):
#     bundles = ModuleBundleSerializer(many=True, read_only=True)

#     class Meta:
#         model = Module
#         fields = ['id', 'title', 'order', 'bundles']
#     def create(self, validated_data):
#         # bundles_data = validated_data.pop('bundles')
#         bundles_data = validated_data.pop('bundles', []) 
#         module = Module.objects.create(**validated_data)

#         for bundle_data in bundles_data:
#             ModuleBundle.objects.create(module=module, course=module.course, **bundle_data)

#         return module

#     def update(self, instance, validated_data):
#         bundles_data = validated_data.pop('bundles', [])

#         # Update module fields
#         instance.title = validated_data.get('title', instance.title)
#         instance.order = validated_data.get('order', instance.order)
#         instance.save()

#         # Clear old bundles (optional: if you want full replace)
#         ModuleBundle.objects.filter(module=instance).delete()

#         for bundle_data in bundles_data:
#             ModuleBundle.objects.create(module=instance, course=instance.course, **bundle_data)

#         return instance


class ModuleBundleSerializer(serializers.ModelSerializer):
    content_title = serializers.SerializerMethodField()

    class Meta:
        model = ModuleBundle
        fields = ['id', 'module', 'content_type', 'content_id', 'description', 'sequence', 'content_title']

    def get_content_title(self, obj):
        if obj.content_type == 'video':
            video = RecordedClass.objects.filter(id=obj.content_id).first()
            return video.title if video else ""
        elif obj.content_type == 'study_material':
            material = StudyMaterial.objects.filter(id=obj.content_id).first()
            return material.title if material else ""
        elif obj.content_type == 'assignment':
            assignment = MockAssignment.objects.filter(id=obj.content_id).first()
            return assignment.title if assignment else ""
        return ""


class ModuleSerializer(serializers.ModelSerializer):
    bundles = ModuleBundleSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'order', 'bundles']

    def create(self, validated_data):
        return Module.objects.create(**validated_data)
