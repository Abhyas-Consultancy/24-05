
from rest_framework import viewsets, permissions, status, views,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, Course, StudentCourse, CourseBundle, Module, StudentModuleProgress
from .serializers import (
    UserSerializer, CourseSerializer, RecordedClassSerializer,
    StudyMaterialSerializer, MockAssignmentSerializer,
    SubmissionSerializer, StudentCourseSerializer,
    CourseBundleSerializer, ModuleSerializer
)
from rest_framework.permissions import IsAuthenticated
User = get_user_model()


# Custom Permissions
class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


# AUTHENTICATION VIEWS

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': {'id': user.id, 'username': user.username, 'role': user.role}})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# USERS
class UserList(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


# COURSE
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Course.objects.filter(created_by=self.request.user)
        elif self.request.user.role == 'admin':
            return Course.objects.all()
        else:
            return Course.objects.none()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# RECORDED CLASS
class RecordedClassViewSet(viewsets.ModelViewSet):
    serializer_class = RecordedClassSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return RecordedClass.objects.filter(uploaded_by=self.request.user)
        elif self.request.user.role == 'student':
            courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
            return RecordedClass.objects.filter(course__in=courses)
        return RecordedClass.objects.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


# STUDY MATERIAL
class StudyMaterialViewSet(viewsets.ModelViewSet):
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return StudyMaterial.objects.filter(uploaded_by=self.request.user)
        elif self.request.user.role == 'student':
            courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
            return StudyMaterial.objects.filter(course__in=courses)
        return StudyMaterial.objects.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


# MOCK ASSIGNMENT
class MockAssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = MockAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return MockAssignment.objects.filter(created_by=self.request.user)
        elif self.request.user.role == 'student':
            courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
            return MockAssignment.objects.filter(course__in=courses)
        return MockAssignment.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# SUBMISSION (you can also convert to ViewSet easily if needed)
class SubmissionListCreate(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role == 'student':
            submissions = Submission.objects.filter(student=request.user)
        elif request.user.role == 'teacher':
            submissions = Submission.objects.filter(mock_assignment__created_by=request.user)
        else:
            submissions = Submission.objects.all()
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Admin Submission List
class SubmissionList(viewsets.ReadOnlyModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

# Student Course Enrollment
class AssignCourseToStudent(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def post(self, request):
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        if not student_id or not course_id:
            return Response({'error': 'student_id and course_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            student = User.objects.get(id=student_id, role='student')
            course = Course.objects.get(id=course_id)
            enrollment, created = StudentCourse.objects.get_or_create(student=student, course=course)
            return Response({'message': 'Course assigned to student successfully'}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
# Create course bundle
class CreateCourseBundle(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description', '')
        recorded_class_ids = request.data.get('recorded_classes', [])
        study_material_ids = request.data.get('study_materials', [])
        mock_assignment_ids = request.data.get('mock_assignments', [])

        if not title:
            return Response({'error': 'Title is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the course
        course = Course.objects.create(title=title, description=description, created_by=request.user)

        # Associate existing recorded classes
        recorded_classes = RecordedClass.objects.filter(id__in=recorded_class_ids)
        recorded_classes.update(course=course)

        # Associate existing study materials
        study_materials = StudyMaterial.objects.filter(id__in=study_material_ids)
        study_materials.update(course=course)

        # Associate existing mock assignments
        mock_assignments = MockAssignment.objects.filter(id__in=mock_assignment_ids)
        mock_assignments.update(course=course)

        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class StudentMockAssignmentList(generics.ListAPIView):
    serializer_class = MockAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        # Students only see mock assignments from their assigned courses
        courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
        return MockAssignment.objects.filter(course__in=courses)

# View for evaluating submissions (AI-based)
class EvaluateSubmission(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def post(self, request):
        submission_id = request.data.get('submission_id')
        evaluate_by_teacher = request.data.get('evaluate_by_teacher', False)
        try:
            submission = Submission.objects.get(id=submission_id, student=request.user)
        except Submission.DoesNotExist:
            return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)

        # Placeholder AI Evaluation (since transformers dependency is causing issues)
        if submission.mock_assignment.skill in ['writing', 'speaking']:
            text = submission.submission_text or "Sample text for evaluation"
            # Simulate AI evaluation (replace with actual implementation when dependencies are resolved)
            submission.ai_score = 6.5  # Placeholder IELTS band score
            submission.ai_feedback = "AI Feedback: Improve coherence and grammar."
            submission.save()

        # Mark for teacher evaluation if requested
        if evaluate_by_teacher:
            submission.teacher_score = None  # Placeholder for teacher to evaluate
            submission.teacher_feedback = "Pending teacher evaluation."
            submission.save()

        return Response({'ai_score': submission.ai_score, 'ai_feedback': submission.ai_feedback})

# View for fetching enrolled courses for a student
class StudentCourseListView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        enrollments = StudentCourse.objects.filter(student=request.user)
        serializer = StudentCourseSerializer(enrollments, many=True)
        return Response(serializer.data)

# View for fetching the course roadmap
class CourseRoadmapView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request, course_id):
        bundles = CourseBundle.objects.filter(module__course_id=course_id)
        serializer = CourseBundleSerializer(bundles, many=True)
        return Response(serializer.data)

# View for fetching skill-based content
class SkillContentView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request, skill):
        # Validate skill
        valid_skills = [choice[0] for choice in MockAssignment.SKILL_CHOICES]
        if skill not in valid_skills:
            return Response({'error': f"Skill must be one of {valid_skills}"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch content for the given skill across all enrolled courses
        enrolled_courses = StudentCourse.objects.filter(student=request.user).values_list('course_id', flat=True)
        videos = RecordedClass.objects.filter(course_id__in=enrolled_courses, skill=skill)
        materials = StudyMaterial.objects.filter(course_id__in=enrolled_courses, skill=skill)
        assignments = MockAssignment.objects.filter(course_id__in=enrolled_courses, skill=skill)

        return Response({
            'videos': RecordedClassSerializer(videos, many=True).data,
            'study_materials': StudyMaterialSerializer(materials, many=True).data,
            'assignments': MockAssignmentSerializer(assignments, many=True).data,
        })

# View for managing course bundles (for teachers/admins)
class CourseBundleListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsTeacher | IsAdmin]

    def get(self, request, course_id):
        bundles = CourseBundle.objects.filter(module__course_id=course_id)
        serializer = CourseBundleSerializer(bundles, many=True)
        return Response(serializer.data)

    def post(self, request, course_id):
        data = request.data
        data['course'] = course_id
        serializer = CourseBundleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for updating/deleting course bundles
class CourseBundleDetailView(APIView):
    permission_classes = [IsAuthenticated, IsTeacher | IsAdmin]

    def put(self, request, bundle_id):
        try:
            bundle = CourseBundle.objects.get(id=bundle_id)
        except CourseBundle.DoesNotExist:
            return Response({'error': 'Bundle not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseBundleSerializer(bundle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bundle_id):
        try:
            bundle = CourseBundle.objects.get(id=bundle_id)
        except CourseBundle.DoesNotExist:
            return Response({'error': 'Bundle not found'}, status=status.HTTP_404_NOT_FOUND)

        bundle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ModuleListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsTeacher]

    def get(self, request, course_id):
        modules = Module.objects.filter(course_id=course_id)
        return Response(ModuleSerializer(modules, many=True).data)

    def post(self, request, course_id):
        course = Course.objects.get(id=course_id)
        module = Module.objects.create(course=course, title=request.data['title'], order=request.data['order'])
        return Response(ModuleSerializer(module).data)

class UnlockNextModuleView(APIView):
    def post(self, request):
        user = request.user
        submission = Submission.objects.get(id=request.data['submission_id'])
        module = submission.mock_assignment.course.modules.get(bundles__content_id=submission.mock_assignment.id)

        progress, created = StudentModuleProgress.objects.get_or_create(student=user, module=module)
        progress.completed = True
        progress.save()

        next_module = Module.objects.filter(course=module.course, order=module.order + 1).first()
        if next_module:
            StudentModuleProgress.objects.get_or_create(student=user, module=next_module, defaults={'is_unlocked': True})

        return Response({'status': 'next module unlocked'})
