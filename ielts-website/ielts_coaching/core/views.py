import requests, json
from django.conf import settings
from rest_framework import viewsets, permissions, status, views,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import authenticate, get_user_model
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, Course, StudentCourse, ModuleBundle, Module, StudentModuleProgress, Assignment,AssignmentSubmission
from .serializers import (
    UserSerializer, CourseSerializer, RecordedClassSerializer,
    StudyMaterialSerializer, MockAssignmentSerializer,
    SubmissionSerializer, StudentCourseSerializer,
    CourseBundleSerializer, ModuleSerializer,ModuleBundleSerializer,AssignmentSerializer,AssignmentSubmissionSerializer
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
# class CourseRoadmapView(APIView):
#     permission_classes = [IsAuthenticated, IsStudent]

#     def get(self, request, course_id):
#         bundles = ModuleBundle.objects.filter(module__course_id=course_id)
#         serializer = CourseBundleSerializer(bundles, many=True)
#         return Response(serializer.data)
class CourseRoadmapView(APIView):
    permission_classes = [IsAuthenticated, IsStudent | IsTeacher]

    def get(self, request, course_id):
        modules = Module.objects.filter(course_id=course_id).order_by('order')
        serializer = ModuleSerializer(modules, many=True)
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
        bundles = ModuleBundle.objects.filter(module__course_id=course_id)
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
            bundle = ModuleBundle.objects.get(id=bundle_id)
        except ModuleBundle.DoesNotExist:
            return Response({'error': 'Bundle not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseBundleSerializer(bundle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bundle_id):
        try:
            bundle = ModuleBundle.objects.get(id=bundle_id)
        except ModuleBundle.DoesNotExist:
            return Response({'error': 'Bundle not found'}, status=status.HTTP_404_NOT_FOUND)

        bundle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# class ModuleListCreateAPIView(generics.ListCreateAPIView):
#     serializer_class = ModuleSerializer
#     permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

#     def get_queryset(self):
#         course_id = self.kwargs['course_id']
#         return Module.objects.filter(course_id=course_id)

#     def perform_create(self, serializer):
#         course_id = self.kwargs['course_id']
#         course = Course.objects.get(id=course_id)
#         serializer.save(course=course)

# class ModuleListCreateAPIView(generics.ListCreateAPIView):
#     serializer_class = ModuleSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         course_id = self.kwargs['course_id']
#         return Module.objects.filter(course_id=course_id).order_by('order')

#     def perform_create(self, serializer):
#         course_id = self.kwargs['course_id']
#         course = Course.objects.get(id=course_id)
#         serializer.save(course=course)

# class ModuleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Module.objects.all()
#     serializer_class = ModuleSerializer
#     permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]
# class UnlockNextModuleView(APIView):
#     def post(self, request):
#         user = request.user
#         submission = Submission.objects.get(id=request.data['submission_id'])
#         module = submission.mock_assignment.course.modules.get(bundles__content_id=submission.mock_assignment.id)

#         progress, created = StudentModuleProgress.objects.get_or_create(student=user, module=module)
#         progress.completed = True
#         progress.save()

#         next_module = Module.objects.filter(course=module.course, order=module.order + 1).first()
#         if next_module:
#             StudentModuleProgress.objects.get_or_create(student=user, module=next_module, defaults={'is_unlocked': True})

#         return Response({'status': 'next module unlocked'})
# from django.shortcuts import get_object_or_404



# class BundleListCreateAPIView(generics.ListCreateAPIView):
#     serializer_class = CourseBundleSerializer
#     permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

#     def get_queryset(self):
#         module_id = self.kwargs['module_id']
#         return ModuleBundle.objects.filter(module_id=module_id)

#     # def perform_create(self, serializer):
#     #     module_id = self.kwargs['module_id']
#     #     # module = Module.objects.get(id=module_id)
#     #     module = get_object_or_404(Module, id=module_id)
#     #     serializer.save(module=module, course=module.course)
#     def perform_create(self, serializer):
#         module_id = self.kwargs['module_id']
#         module = get_object_or_404(Module, id=module_id)
#         course = module.course  # Get course from module
#         serializer.save(module=module, course=course)


# class BundleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ModuleBundle.objects.all()
#     serializer_class = CourseBundleSerializer
#     permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

from django.shortcuts import get_object_or_404

class ModuleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Module.objects.filter(course_id=course_id).order_by('order')

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Course, id=course_id)
        serializer.save(course=course)


class ModuleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]


class BundleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ModuleBundleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return ModuleBundle.objects.filter(module_id=module_id)

    def perform_create(self, serializer):
        module_id = self.kwargs['module_id']
        module = get_object_or_404(Module, id=module_id)
        serializer.save(module=module, course=module.course)


class BundleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModuleBundle.objects.all()
    serializer_class = ModuleBundleSerializer
    permission_classes = [permissions.IsAuthenticated]


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

# class AssignmentCreateView(APIView):
#     def post(self, request):
#         data = request.data
#         serializer = AssignmentSerializer(data={
#             'test_id': data.get('test_id'),
#             'title': data.get('title'),
#             'json_content': data
#         })
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentListCreateView(APIView):
    def get(self, request):
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = AssignmentSerializer(data={
            'test_id': data.get('test_id'),
            'title': data.get('title'),
            'json_content': data.get('json_content')
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentDetailView(APIView):
    
    def get(self, request, pk):
        try:
            assignment = Assignment.objects.get(pk=pk)
            serializer = AssignmentSerializer(assignment)
            return Response(serializer.data)
        except Assignment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            assignment = Assignment.objects.get(pk=pk)
            data = request.data
            serializer = AssignmentSerializer(assignment, data={
                'test_id': data.get('test_id'),
                'title': data.get('title'),
                'json_content': data.get('json_content')
            })
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Assignment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            assignment = Assignment.objects.get(pk=pk)
            assignment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Assignment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class FileUploadView(APIView):
    def post(self, request):
        file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)
        return Response({'file_url': f'{request.build_absolute_uri("/")[:-1]}{file_url}'}, status=status.HTTP_201_CREATED)
    
# class AssignmentSubmissionView(APIView):
#     def post(self, request, pk):
#         serializer = AssignmentSubmissionSerializer(data=request.data, context={'request': request, 'view': self})
#         if serializer.is_valid():
#             # Create or update submission
#             submission, created = AssignmentSubmission.objects.get_or_create(
#                 assignment=serializer.validated_data['assignment'],
#                 student=serializer.validated_data['student'],
#                 defaults={'answers': serializer.validated_data['answers']}
#             )
#             if not created:
#                 submission.answers = serializer.validated_data['answers']
#                 submission.ai_analysis = None  # Reset AI analysis
#                 submission.score = None
#                 submission.save()

#             return Response({
#                 'message': 'Submission successful',
#                 'submission_id': submission.id
#             }, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentSubmissionView(generics.GenericAPIView):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'options']  # Explicitly allow GET, POST, OPTIONS

    def get(self, request, pk):
        try:
            submission = AssignmentSubmission.objects.get(assignment_id=pk, student=request.user)
            serializer = AssignmentSubmissionSerializer(submission)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AssignmentSubmission.DoesNotExist:
            return Response({'message': 'No submission found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        serializer = self.get_serializer(data=request.data, context={'request': request, 'view': self})
        if serializer.is_valid():
            submission, created = AssignmentSubmission.objects.get_or_create(
                assignment=serializer.validated_data['assignment'],
                student=serializer.validated_data['student'],
                defaults={'answers': serializer.validated_data['answers']}
            )
            if not created:
                submission.answers = serializer.validated_data['answers']
                submission.ai_analysis = None
                submission.score = None
                submission.save()

            return Response({
                'message': 'Submission successful',
                'submission_id': submission.id
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
import requests
import json
import logging
from django.conf import settings
from openai import OpenAI
# Set up logging
logger = logging.getLogger(__name__)
# In core/views.py, AIEvaluationView
# class AIEvaluationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, pk):
#         try:
#             submission = AssignmentSubmission.objects.get(id=pk, student=request.user)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({"error": "No AssignmentSubmission matches the given query."}, status=404)

#         client = OpenAI(api_key=settings.OPENAI_API_KEY)

#         # Build the prompt from student's answers
#         answers = submission.answers
#         if not answers:
#             return Response({"error": "No answers found in submission."}, status=400)

#         combined_text = "\n\n".join(
#             f"Q{idx+1}: {answer}" for idx, answer in enumerate(answers.values())
#         )

#         system_prompt = (
#             # "You are an IELTS examiner. Please evaluate the following IELTS Writing Task 2 answer. "
#             # "Give a band score (1-9), and a brief explanation under the headings: Task Response, Coherence and Cohesion, "
#             # "Lexical Resource, and Grammatical Range and Accuracy."
#             "You are an IELTS examiner evaluating essay or speaking responses based on IELTS band descriptors (0-9 scale). For each question, provide band scores for Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy, along with a detailed explanation for each criterion." \
#             "if it mcq, short answer or true false you can find the answer in the submission itself as i have already given while creating the assignment so give evaluation accordingly  "
#         )

#         try:
#             chat_response = client.chat.completions.create(
#                 model="gpt-4.1-nano-2025-04-14",
#                 messages=[
#                     {"role": "system", "content": system_prompt},
#                     {"role": "user", "content": combined_text},
#                 ],
#                 temperature=0.5
#             )

#             ai_output = chat_response.choices[0].message.content

#             submission.ai_analysis = ai_output
#             # Optional: extract band score from response using regex
#             submission.save()

#             return Response({"analysis": ai_output}, status=200)

#         except Exception as e:
#             logger.exception("AI evaluation failed")
#             return Response({"error": str(e)}, status=500)


# class AIEvaluationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, pk):
#         try:
#             submission = AssignmentSubmission.objects.get(id=pk, student=request.user)
#             assignment = Assignment.objects.get(id=submission.assignment.id)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({"error": "No AssignmentSubmission matches the given query."}, status=404)
#         except Assignment.DoesNotExist:
#             return Response({"error": "Assignment not found."}, status=404)

#         answers = submission.answers
#         if not answers:
#             return Response({"error": "No answers found in submission."}, status=400)

#         json_content = assignment.json_content
#         if isinstance(json_content, str):
#             try:
#                 json_content = json.loads(json_content)
#             except json.JSONDecodeError:
#                 return Response({"error": "Invalid JSON content in assignment."}, status=400)

#         # Build evaluation data
#         evaluation_data = []
#         ai_evaluation_keys = []
#         evaluation_results = {}

#         for section in json_content.get('sections', []):
#             for task in section.get('tasks', []):
#                 if section.get('name') == 'SPEAKING' or (task.get('questions') and any(q.get('type') == 'essay' for qs in task.get('questions', []) for q in qs.get('questions', []))):
#                     if section.get('name') == 'SPEAKING':
#                         key = f"{section['section_id']}_{task['id']}"
#                         evaluation_data.append({
#                             'key': key,
#                             'type': 'speaking',
#                             'question': task.get('title', ''),
#                             'student_answer': answers.get(key, ''),
#                             'correct_answer': None
#                         })
#                         ai_evaluation_keys.append(key)
#                     elif task.get('questions'):
#                         for questionSet in task.get('questions', []):
#                             for question in questionSet.get('questions', []):
#                                 if question.get('type') == 'essay':
#                                     key = f"{section['section_id']}_{task['id']}_{question['question_id']}"
#                                     evaluation_data.append({
#                                         'key': key,
#                                         'type': 'essay',
#                                         'question': question.get('text', ''),
#                                         'student_answer': answers.get(key, ''),
#                                         'correct_answer': None
#                                     })
#                                     ai_evaluation_keys.append(key)
#                 elif task.get('questions'):
#                     for questionSet in task.get('questions', []):
#                         for question in questionSet.get('questions', []):
#                             key = f"{section['section_id']}_{task['id']}_{question['question_id']}"
#                             question_type = question.get('type')
#                             correct_answer = question.get('answer')
#                             student_answer = answers.get(key, '')

#                             if question_type in ['short_answer', 'multiple_choice', 'true_false_not_given', 'table']:
#                                 is_correct = False
#                                 analysis = ""
#                                 score = 0

#                                 if question_type == 'table':
#                                     correct_answer = correct_answer if isinstance(correct_answer, list) else [correct_answer]
#                                     student_answer = student_answer if isinstance(student_answer, list) else [student_answer]
#                                     correct_count = sum(
#                                         1 for s, c in zip(student_answer, correct_answer)
#                                         if str(s).strip().lower() == str(c).strip().lower()
#                                     )
#                                     total = len(correct_answer) if correct_answer else 1
#                                     score = (correct_count / total) * 9
#                                     is_correct = correct_count == total
#                                     analysis = f"{'All' if is_correct else f'{correct_count}/{total}'} answers correct."
#                                 else:
#                                     is_correct = str(student_answer).strip().lower() == str(correct_answer).strip().lower()
#                                     score = 9 if is_correct else 0
#                                     analysis = "Correct" if is_correct else f"Incorrect. Expected: {correct_answer}"

#                                 evaluation_results[key] = {
#                                     "scores": {
#                                         "task_achievement": score,
#                                         "overall": score
#                                     },
#                                     "analysis": analysis,
#                                     "correct_answer": correct_answer
#                                 }

#         # AI evaluation for essay and speaking questions
#         if ai_evaluation_keys:
#             client = OpenAI(api_key=settings.OPENAI_API_KEY)
#             system_prompt = """
# You are an IELTS examiner evaluating essay or speaking responses based on IELTS band descriptors (0-9 scale) and there are other questions as welllike mcq, short answer and true, false not given fot them i have answer stored in json . For each speaking and writing question, provide band scores for Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy, along with a detailed explanation for each criterion. Return a JSON object where each key is the question's 'key' from the evaluation data, with the following structure:
# {
#   "key": {
#     "scores": {
#       "task_achievement": number,
#       "coherence_cohesion": number,
#       "lexical_resource": number,
#       "grammatical_range": number,
#       "overall": number
#     },
#     "analysis": {
#       "task_achievement": "string",
#       "coherence_cohesion": "string",
#       "lexical_resource": "string",
#       "grammatical_range": "string"
#     },
#     "correct_answer": null
#   }
# }
# Evaluation Data: {evaluation_data}
# """

#             try:
#                 chat_response = client.chat.completions.create(
#                     model="gpt-4o",
#                     messages=[
#                         {"role": "system", "content": system_prompt.format(evaluation_data=json.dumps([d for d in evaluation_data if d['key'] in ai_evaluation_keys]))},
#                         {"role": "user", "content": "Evaluate the provided answers and return a JSON object as specified."}
#                     ],
#                     temperature=0.5
#                 )

#                 # Parse AI response
#                 try:
#                     ai_output = json.loads(chat_response.choices[0].message.content)
#                     # Validate that all expected keys are present
#                     for key in ai_evaluation_keys:
#                         if key not in ai_output:
#                             logger.warning(f"Missing evaluation for key: {key}")
#                             ai_output[key] = {
#                                 "scores": {
#                                     "task_achievement": 0,
#                                     "coherence_cohesion": 0,
#                                     "lexical_resource": 0,
#                                     "grammatical_range": 0,
#                                     "overall": 0
#                                 },
#                                 "analysis": {
#                                     "task_achievement": "Evaluation failed.",
#                                     "coherence_cohesion": "Evaluation failed.",
#                                     "lexical_resource": "Evaluation failed.",
#                                     "grammatical_range": "Evaluation failed."
#                                 },
#                                 "correct_answer": "null"
#                             }
#                     evaluation_results.update(ai_output)
#                 except json.JSONDecodeError as e:
#                     logger.error(f"Invalid JSON in OpenAI response: {str(e)}")
#                     # Fallback for AI-evaluated questions
#                     for key in ai_evaluation_keys:
#                         evaluation_results[key] = {
#                             "scores": {
#                                 "task_achievement": 0,
#                                 "coherence_cohesion": 0,
#                                 "lexical_resource": 0,
#                                 "grammatical_range": 0,
#                                 "overall": 0
#                             },
#                             "analysis": {
#                                 "task_achievement": "Failed to parse AI evaluation.",
#                                 "coherence_cohesion": "Failed to parse AI evaluation.",
#                                 "lexical_resource": "Failed to parse AI evaluation.",
#                                 "grammatical_range": "Failed to parse AI evaluation."
#                             },
#                             "correct_answer": "null"
#                         }
#                     return Response({"error": f"Invalid JSON in AI response: {str(e)}"}, status=500)

#             except Exception as e:
#                 logger.exception("AI evaluation failed")
#                 return Response({"error": str(e)}, status=500)

#         # Calculate overall score
#         overall_score = sum(result['scores']['overall'] for result in evaluation_results.values()) / len(evaluation_results) if evaluation_results else None

#         submission.ai_analysis = evaluation_results
#         submission.score = round(overall_score, 1) if overall_score else None
#         submission.save()

#         return Response({"analysis": evaluation_results, "score": submission.score}, status=200)

from .evaluate_submission import evaluate_submission
from .serializers import EvaluationSerializer
# class AIEvaluationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, pk):
#         try:
#             submission = AssignmentSubmission.objects.get(id=pk, student=request.user)
#             assignment = Assignment.objects.get(id=submission.assignment.id)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({"error": "No AssignmentSubmission matches the given query."}, status=404)
#         except Assignment.DoesNotExist:
#             return Response({"error": "Assignment not found."}, status=404)

#         answers = submission.answers
#         if not answers:
#             return Response({"error": "No answers found in submission."}, status=400)

#         json_content = assignment.json_content
#         if isinstance(json_content, str):
#             try:
#                 json_content = json.loads(json_content)
#             except json.JSONDecodeError:
#                 return Response({"error": "Invalid JSON content in assignment."}, status=400)

#         # Prepare data for evaluate_submission
#         submission_data = {
#             'id': submission.id,
#             'assignment': submission.assignment.id,
#             'student': submission.student.id,
#             'answers': answers,
#             'score': submission.score,
#             'ai_analysis': submission.ai_analysis,
#             'submitted_at': submission.submitted_at.isoformat()
#         }
#         assignment_data = {
#             'id': assignment.id,
#             'test_id': assignment.test_id,
#             'title': assignment.title,
#             'json_content': json_content
#         }

#         # Evaluate short answer, MCQ, true/false, and table questions
#         evaluation = evaluate_submission(submission_data, assignment_data)

#         # Handle essay and speaking questions
#         ai_evaluation_keys = []
#         evaluation_data = []
#         for section in json_content.get('sections', []):
#             for task in section.get('tasks', []):
#                 if section.get('name') == 'SPEAKING':
#                     key = f"{section['section_id']}_{task['id']}"
#                     evaluation_data.append({
#                         'key': key,
#                         'type': 'speaking',
#                         'question': task.get('title', ''),
#                         'student_answer': answers.get(key, ''),
#                         'correct_answer': None
#                     })
#                     ai_evaluation_keys.append(key)
#                 elif task.get('questions'):
#                     for question_set in task.get('questions', []):
#                         for question in question_set.get('questions', []):
#                             if question.get('type') == 'essay':
#                                 key = f"{section['section_id']}_{task['id']}_{question['question_id']}"
#                                 evaluation_data.append({
#                                     'key': key,
#                                     'type': 'essay',
#                                     'question': question.get('text', ''),
#                                     'student_answer': answers.get(key, ''),
#                                     'correct_answer': None
#                                 })
#                                 ai_evaluation_keys.append(key)

#         # AI evaluation for essay and speaking questions
#         if ai_evaluation_keys:
#             system_prompt = system_prompt = """
# # You are an IELTS examiner evaluating essay or speaking responses based on IELTS band descriptors (0-9 scale). For each response, provide band scores for Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy, along with a detailed explanation for each criterion. Return a JSON object where each key is the question's 'key' from the evaluation data, with the following structure and if it is writing task analyse it yourself and evaluate and give the provided below json accordingly and add the data if not there:
# {{
#   "key": {{
#     "scores": {{
#       "task_achievement": number,
#       "coherence_cohesion": number,
#       "lexical_resource": number,
#       "grammatical_range": number,
#       "overall": number
#     }},
#     "analysis": {{
#       "task_achievement": "string",
#       "coherence_cohesion": "string",
#       "lexical_resource": "string",
#       "grammatical_range": "string"
#     }},
#     "correct_answer": null
#   }}
# }}
# Evaluation Data: {evaluation_data}
# """

#             try:
#                 client = OpenAI(api_key=settings.OPENAI_API_KEY)

#                 chat_response = client.chat.completions.create(
#                     model="gpt-4.1-nano-2025-04-14",
#                     messages=[
#                         {"role": "system", "content": system_prompt.format(evaluation_data=json.dumps([d for d in evaluation_data if d['key'] in ai_evaluation_keys]))},
#                         {"role": "user", "content": "Evaluate the provided answers and return a JSON object as specified."}
#                     ],
#                     # evaluation_json = json.dumps([d for d in evaluation_data if d['key'] in ai_evaluation_keys])
#                     # messages=[
#                     #     {"role": "system", "content": system_prompt.format(evaluation_data=evaluation_json)},
#                     #     {"role": "user", "content": "Evaluate the provided answers and return a JSON object as specified."}
#                     # ],

#                     temperature=0.5
#                 )

                

#                 ai_output = json.loads(chat_response['choices'][0]['message']['content'])
#                 for key in ai_evaluation_keys:
#                     if key not in ai_output:
#                         logger.warning(f"Missing evaluation for key: {key}")
#                         ai_output[key] = {
#                             "scores": {
#                                 "task_achievement": 0,
#                                 "coherence_cohesion": 0,
#                                 "lexical_resource": 0,
#                                 "grammatical_range": 0,
#                                 "overall": 0
#                             },
#                             "analysis": {
#                                 "task_achievement": "Evaluation failed.",
#                                 "coherence_cohesion": "Evaluation failed.",
#                                 "lexical_resource": "Evaluation failed.",
#                                 "grammatical_range": "Evaluation failed."
#                             },
#                             "correct_answer": None
#                         }
#                 evaluation['results'].extend([
#                     {
#                         'question_id': key,
#                         'status': 'evaluated',
#                         'submitted_answer': data['student_answer'],
#                         'correct_answer': None,
#                         'scores': ai_output[key]['scores'],
#                         'feedback': ai_output[key]['analysis']
#                     } for key, data in [(d['key'], d) for d in evaluation_data if d['key'] in ai_evaluation_keys]
#                 ])
#                 evaluation['analytics']['suggestions'].extend([
#                     f"Question {data['key'].split('_')[-1]}: Review AI feedback for improvement."
#                     for data in evaluation_data if data['key'] in ai_evaluation_keys
#                 ])

#             except Exception as e:
#                 logger.error(f"xAI evaluation failed: {str(e)}")
#                 for key in ai_evaluation_keys:
#                     evaluation['results'].append({
#                         'question_id': key,
#                         'status': 'error',
#                         'submitted_answer': evaluation_data[ai_evaluation_keys.index(key)]['student_answer'],
#                         'correct_answer': None,
#                         'scores': {
#                             'task_achievement': 0,
#                             'coherence_cohesion': 0,
#                             'lexical_resource': 0,
#                             'grammatical_range': 0,
#                             'overall': 0
#                         },
#                         'feedback': f"AI evaluation failed: {str(e)}"
#                     })
#                     evaluation['analytics']['suggestions'].append(
#                         f"Question {key.split('_')[-1]}: AI evaluation unavailable."
#                     )

#         # Update submission
#         submission.ai_analysis = {
#             'results': evaluation['results'],
#             'analytics': evaluation['analytics'],
#             'overall_feedback': evaluation['overall_feedback']
#         }
#         submission.score = evaluation['analytics']['score']   
#         submission.save()

#         serializer = EvaluationSerializer(evaluation)
#         return Response(serializer.data, status=status.HTTP_200_OK)



class AIEvaluationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            submission = AssignmentSubmission.objects.get(id=pk, student=request.user)
            assignment = Assignment.objects.get(id=submission.assignment.id)
        except AssignmentSubmission.DoesNotExist:
            return Response({"error": "No AssignmentSubmission matches the given query."}, status=404)
        except Assignment.DoesNotExist:
            return Response({"error": "Assignment not found."}, status=404)

        answers = submission.answers
        if not answers:
            return Response({"error": "No answers found in submission."}, status=400)

        json_content = assignment.json_content
        if isinstance(json_content, str):
            try:
                json_content = json.loads(json_content)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON content in assignment."}, status=400)

        # Prepare data for evaluate_submission
        submission_data = {
            'id': submission.id,
            'assignment': assignment.id,
            'student': submission.student.id,
            'answers': answers,
            'score': submission.score,
            'ai_analysis': submission.ai_analysis,
            'submitted_at': submission.submitted_at.isoformat()
        }
        assignment_data = {
            'id': assignment.id,
            'test_id': assignment.test_id,
            'title': assignment.title,
            'json_content': json_content
        }

        # Evaluate objective-type questions first
        evaluation = evaluate_submission(submission_data, assignment_data)

        # Prepare data for AI evaluation (essay/speaking only)
        ai_evaluation_keys = []
        evaluation_data = []
        for section in json_content.get('sections', []):
            for task in section.get('tasks', []):
                if section.get('name') == 'SPEAKING':
                    key = f"{section['section_id']}_{task['id']}"
                    evaluation_data.append({
                        'key': key,
                        'type': 'speaking',
                        'question': task.get('title', ''),
                        'student_answer': answers.get(key, ''),
                        'correct_answer': None
                    })
                    ai_evaluation_keys.append(key)
                elif task.get('questions'):
                    for question_set in task.get('questions', []):
                        for question in question_set.get('questions', []):
                            if question.get('type') == 'essay':
                                key = f"{section['section_id']}_{task['id']}_{question['question_id']}"
                                evaluation_data.append({
                                    'key': key,
                                    'type': 'essay',
                                    'question': question.get('text', ''),
                                    'student_answer': answers.get(key, ''),
                                    'correct_answer': None
                                })
                                ai_evaluation_keys.append(key)

        # AI evaluation prompt with escaped JSON template
        system_prompt = """
# You are an IELTS examiner evaluating essay or speaking responses based on IELTS band descriptors (0-9 scale). For each response, provide band scores for Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy, along with a detailed explanation for each criterion. Return a JSON object where each key is the question's 'key' from the evaluation data, with the following structure and if it is writing task analyse it yourself and evaluate and give the provided below json accordingly and add the data if not there, and be strict like if you are giving 8 to some evaluation of essay then give it 6.5 or 7:
{{
  "key": {{
    "scores": {{
      "task_achievement": number,
      "coherence_cohesion": number,
      "lexical_resource": number,
      "grammatical_range": number,
      "overall": number
    }},
    "analysis": {{
      "task_achievement": "string",
      "coherence_cohesion": "string",
      "lexical_resource": "string",
      "grammatical_range": "string"
    }},
    "correct_answer": null
  }}
}}
Evaluation Data: {evaluation_data}
"""

        if ai_evaluation_keys:
            try:
                client = OpenAI(api_key=settings.OPENAI_API_KEY)

                evaluation_json = json.dumps(
                    [d for d in evaluation_data if d['key'] in ai_evaluation_keys],
                    ensure_ascii=False
                )

                chat_response = client.chat.completions.create(
                    model="gpt-4.1-nano-2025-04-14",
                    messages=[
                        {"role": "system", "content": system_prompt.format(evaluation_data=evaluation_json)},
                        {"role": "user", "content": "Evaluate the provided answers and return a JSON object as specified."}
                    ],
                    temperature=0.5
                )

                ai_output = json.loads(chat_response.choices[0].message.content)

                for key in ai_evaluation_keys:
                    if key not in ai_output:
                        logger.warning(f"Missing evaluation for key: {key}")
                        ai_output[key] = {
                            "scores": {
                                "task_achievement": 0,
                                "coherence_cohesion": 0,
                                "lexical_resource": 0,
                                "grammatical_range": 0,
                                "overall": 0
                            },
                            "analysis": {
                                "task_achievement": "Evaluation failed.",
                                "coherence_cohesion": "Evaluation failed.",
                                "lexical_resource": "Evaluation failed.",
                                "grammatical_range": "Evaluation failed."
                            },
                            "correct_answer": None
                        }

                # evaluation['results'].extend([
                #     {
                #         'question_id': key,
                #         'status': 'evaluated',
                #         'submitted_answer': data['student_answer'],
                #         'correct_answer': None,
                #         'scores': ai_output[key]['scores'],
                #         'feedback': ai_output[key]['analysis']
                #     } for data in evaluation_data if (key := data['key']) in ai_evaluation_keys
                # ])
                evaluation['results'].extend([
                    {
                        'question_id': key,
                        'status': 'evaluated',
                        'submitted_answer': data['student_answer'],
                        'correct_answer': None,
                        'scores': ai_output[key]['scores'],
                        'feedback': ai_output[key]['analysis']
                    } for key, data in [(d['key'], d) for d in evaluation_data if d['key'] in ai_evaluation_keys]
                ])
                # Fix: Calculate average score from AI-evaluated questions
                ai_scores = [ai_output[key]['scores']['overall'] for key in ai_evaluation_keys if key in ai_output]
                if ai_scores:
                    evaluation['analytics']['score'] = round(sum(ai_scores) / len(ai_scores), 1)

                evaluation['analytics']['suggestions'].extend([
                    f"Question {data['key'].split('_')[-1]}: Review AI feedback for improvement."
                    for data in evaluation_data if data['key'] in ai_evaluation_keys
                ])

            except Exception as e:
                logger.error(f"AI evaluation failed: {str(e)}")
                for key in ai_evaluation_keys:
                    evaluation['results'].append({
                        'question_id': key,
                        'status': 'error',
                        'submitted_answer': next((d['student_answer'] for d in evaluation_data if d['key'] == key), ''),
                        'correct_answer': None,
                        'scores': {
                            "task_achievement": 0,
                            "coherence_cohesion": 0,
                            "lexical_resource": 0,
                            "grammatical_range": 0,
                            "overall": 0
                        },
                        'feedback': f"AI evaluation failed: {str(e)}"
                    })
                    evaluation['analytics']['suggestions'].append(
                        f"Question {key.split('_')[-1]}: AI evaluation unavailable."
                    )

        # Update and save submission
        # Fix: Generate more meaningful overall feedback from AI feedback
        feedback_summaries = []
        for key in ai_evaluation_keys:
            fb = ai_output[key]['analysis']
            summary = f"""
        Essay Evaluation:
        - Task Achievement: {fb['task_achievement']}
        - Coherence & Cohesion: {fb['coherence_cohesion']}
        - Lexical Resource: {fb['lexical_resource']}
        - Grammatical Range: {fb['grammatical_range']}
        """
            feedback_summaries.append(summary.strip())

        evaluation['overall_feedback'] = "\n\n".join(feedback_summaries)

        submission.ai_analysis = {
            'results': evaluation['results'],
            'analytics': evaluation['analytics'],
            'overall_feedback': evaluation.get('overall_feedback', '')
        }
        submission.score = evaluation['analytics'].get('score', 0)
        submission.save()

        serializer = EvaluationSerializer(evaluation)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):
        try:
            submissions = AssignmentSubmission.objects.filter(student_id=student_id)
            analytics_data = {
                'total_questions': 0,
                'correct_answers': 0,
                'accuracy_percentage': 0,
                'average_score': 0,
                'submissions': []
            }

            for submission in submissions:
                if not submission.ai_analysis:
                    continue
                analytics = submission.ai_analysis.get('analytics', {})
                analytics_data['total_questions'] += analytics.get('total_questions', 0)
                analytics_data['correct_answers'] += analytics.get('correct_answers', 0)
                analytics_data['submissions'].append({
                    'submission_id': submission.id,
                    'assignment_id': submission.assignment.id,
                    'score': analytics.get('score', 0),
                    'overall_feedback': submission.ai_analysis.get('overall_feedback', ''),
                    'results': submission.ai_analysis.get('results', [])
                })

            if analytics_data['total_questions'] > 0:
                analytics_data['accuracy_percentage'] = round(
                    (analytics_data['correct_answers'] / analytics_data['total_questions']) * 100, 2
                )
                analytics_data['average_score'] = round(
                    sum(sub['score'] for sub in analytics_data['submissions']) / len(analytics_data['submissions']),
                    1
                ) if analytics_data['submissions'] else 0

            return Response(analytics_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Unexpected error in AnalyticsView: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):
        try:
            submissions = AssignmentSubmission.objects.filter(student_id=student_id)
            data = []
            for submission in submissions:
                for key, result in (submission.ai_analysis or {}).items():
                    data.append({
                        'task': key,
                        'score': result['score']['overall'],
                        'analysis': result['analysis']
                    })

            prompt = """
                You are an IELTS examiner evaluating a Writing Task 2 essay based on IELTS band descriptors (0-9 scale).
                Score Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
                Provide ONLY a valid JSON object. Do not explain anything else. Return ONLY this JSON structure:
                {
                "score": {
                    "task_achievement": number,
                    "coherence_cohesion": number,
                    "lexical_resource": number,
                    "grammatical_range": number,
                    "overall": number
                },
                "analysis": "string"
                }
                Task: {task}
                Response: {response}
                """

            response = requests.post(
                'https://api.openai.com/v1/chat/completions',
                json={
                    'model': 'gpt-4-mini',
                    'messages': [{'role': 'user', 'content': prompt.format(data=json.dumps(data))}],
                    'max_tokens': 500,
                    'temperature': 0.7,
                    'response_format': 'json'
                },
                headers={'Authorization': f'Bearer {settings.OPENAI_API_KEY}'}
            )
            response_data = response.json()
            if response.status_code != 200 or 'choices' not in response_data or not response_data['choices']:
                logger.error(f"OpenAI API error for analytics: {response_data}")
                return Response(
                    {'error': 'Invalid AI response', 'details': response_data},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            analytics = json.loads(response_data['choices'][0]['message']['content'])
            return Response(analytics, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            logger.error(f"OpenAI request failed for analytics: {str(e)}")
            return Response(
                {'error': f'OpenAI API request failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in OpenAI response for analytics: {str(e)}")
            return Response(
                {'error': 'Invalid AI response format'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            logger.error(f"Unexpected error in AnalyticsView: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# @method_decorator(csrf_exempt, name='dispatch')
# class ResetSubmissionView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, assignment_id):
#         try:
#             submission = AssignmentSubmission.objects.get(assignment_id=assignment_id, student=request.user)
#             submission.delete()
#             return Response({"message": "Submission reset successfully"}, status=status.HTTP_200_OK)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({"error": "No submission found for this assignment"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_assignment_submission(request, pk):
    try:
        submission = AssignmentSubmission.objects.get(assignment_id=pk, student=request.user)
        submission.delete()
        return Response({'message': 'Submission reset successfully.'})
    except Submission.DoesNotExist:
        return Response({'error': 'Submission not found.'}, status=404)