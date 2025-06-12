# # 1.First Working
# from django.urls import path
# from .views import RegisterView, LoginView, RecordedClassListCreate, StudyMaterialListCreate, MockAssignmentListCreate, SubmissionListCreate, EvaluateSubmission

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-class-list'),
#     path('study-materials/', StudyMaterialListCreate.as_view(), name='study-material-list'),
#     path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignment-list'),
#     path('submissions/', SubmissionListCreate.as_view(), name='submission-list'),
#     path('evaluate-submission/', EvaluateSubmission.as_view(), name='evaluate-submission'),
# ]

# 2.Second Working but not able view video

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('register/', views.RegisterView.as_view(), name='register'),
#     path('login/', views.LoginView.as_view(), name='login'),
#     path('users/', views.UserList.as_view(), name='user-list'),
#     path('courses/', views.CourseListCreate.as_view(), name='course-list-create'),
#     path('assign-course/', views.AssignCourseToStudent.as_view(), name='assign-course'),
#     path('create-course-bundle/', views.CreateCourseBundle.as_view(), name='create-course-bundle'),
#     path('recorded-classes/', views.RecordedClassListCreate.as_view(), name='recorded-class-list-create'),
#     path('study-materials/', views.StudyMaterialListCreate.as_view(), name='study-material-list-create'),
#     path('mock-assignments/', views.MockAssignmentListCreate.as_view(), name='mock-assignment-list-create'),
#     path('student-mock-assignments/', views.StudentMockAssignmentList.as_view(), name='student-mock-assignment-list'),
#     path('submissions/', views.SubmissionListCreate.as_view(), name='submission-list-create'),
#     path('evaluate-submission/', views.EvaluateSubmission.as_view(), name='evaluate-submission'),
# ]

# 3.Third

# from django.urls import path
# from .views import (
#     UserRegister, RecordedClassListCreate, StudyMaterialListCreate,
#     MockAssignmentListCreate, SubmissionListCreate, CourseListCreate,
#     CourseBundleCreate, StudentCourseList
# )

# urlpatterns = [
#     path('register/', UserRegister.as_view(), name='register'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-classes'),
#     path('study-materials/', StudyMaterialListCreate.as_view(), name='study-materials'),
#     path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignments'),
#     path('submissions/', SubmissionListCreate.as_view(), name='submissions'),
#     path('courses/', CourseListCreate.as_view(), name='courses'),
#     path('create-course-bundle/', CourseBundleCreate.as_view(), name='create-course-bundle'),
#     path('student-courses/', StudentCourseList.as_view(), name='student-courses'),
# ]

# Working

# from django.urls import path, include
# from .views import (
#     RegisterView, LoginView, RecordedClassListCreate,  # Changed to RecordedClassListCreate
#     StudyMaterialListCreateView, MockAssignmentListCreateView,
#     SubmissionListCreateView, CourseListCreateView, StudentCourseListView
# )

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-class-list-create'),
#     path('study-materials/', StudyMaterialListCreateView.as_view(), name='study-material-list-create'),
#     path('mock-assignments/', MockAssignmentListCreateView.as_view(), name='mock-assignment-list-create'),
#     path('submissions/', SubmissionListCreateView.as_view(), name='submission-list-create'),
#     path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
#     path('student-courses/', StudentCourseListView.as_view(), name='student-course-list'),
# ]

# from rest_framework.routers import DefaultRouter
# from django.urls import path, include
# from .views import (
#     RegisterView, LoginView, UserList, CourseListCreate, AssignCourseToStudent,
#     CreateCourseBundle, RecordedClassListCreate, StudyMaterialListCreate,
#     MockAssignmentListCreate, StudentMockAssignmentList, SubmissionListCreate,
#     EvaluateSubmission, SubmissionList, StudentCourseListView, CourseRoadmapView,
#     SkillContentView, CourseBundleListCreateView, CourseBundleDetailView,ModuleListCreateView,UnlockNextModuleView,RecordedClassViewSet
# )
# router = DefaultRouter()
# router.register(r'recorded-classes', RecordedClassViewSet, basename='recorded-class')

# urlpatterns = [
#     path('api/', include(router.urls)),
# ]
# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('users/', UserList.as_view(), name='user-list'),
#     path('courses/', CourseListCreate.as_view(), name='course-list-create'),
#     path('assign-course/', AssignCourseToStudent.as_view(), name='assign-course'),
#     path('create-course-bundle/', CreateCourseBundle.as_view(), name='create-course-bundle'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-class-list-create'),
#     path('study-materials/', StudyMaterialListCreate.as_view(), name='study-material-list-create'),
#     path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignment-list-create'),
#     path('student-mock-assignments/', StudentMockAssignmentList.as_view(), name='student-mock-assignment-list'),
#     path('submissions/', SubmissionListCreate.as_view(), name='submission-list-create'),
#     path('evaluate-submission/', EvaluateSubmission.as_view(), name='evaluate-submission'),
#     path('submission-list/', SubmissionList.as_view(), name='submission-list'),
#     path('student-courses/', StudentCourseListView.as_view(), name='student-course-list'),
#     path('course-roadmap/<int:course_id>/', CourseRoadmapView.as_view(), name='course-roadmap'),
#     path('skill-content/<str:skill>/', SkillContentView.as_view(), name='skill-content'),
#     path('course-bundles/<int:course_id>/', CourseBundleListCreateView.as_view(), name='course-bundle-list-create'),
#     path('course-bundle/<int:bundle_id>/', CourseBundleDetailView.as_view(), name='course-bundle-detail'),
#     path('course/<int:course_id>/modules/', ModuleListCreateView.as_view(), name='module-list-create'),
#     path('unlock-next-module/', UnlockNextModuleView.as_view(), name='unlock-next-module'),

# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, LoginView, UserList, CourseViewSet, RecordedClassViewSet,
    StudyMaterialViewSet, MockAssignmentViewSet, SubmissionListCreate,
    SubmissionList, AssignCourseToStudent,CreateCourseBundle,StudentMockAssignmentList,EvaluateSubmission,StudentCourseListView,CourseRoadmapView,SkillContentView
    ,CourseBundleListCreateView,CourseBundleDetailView,ModuleListCreateView,UnlockNextModuleView
)

router = DefaultRouter()

# RESTful ViewSets registered here
router.register(r'users', UserList, basename='user')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'recorded-classes', RecordedClassViewSet, basename='recordedclass')
router.register(r'study-materials', StudyMaterialViewSet, basename='studymaterial')
router.register(r'mock-assignments', MockAssignmentViewSet, basename='mockassignment')
router.register(r'submissions-admin', SubmissionList, basename='admin-submissions')

urlpatterns = [
    path('', include(router.urls)),

    # Login/Register + APIViews
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),


    path('assign-course/', AssignCourseToStudent.as_view(), name='assign-course'),
    path('create-course-bundle/', CreateCourseBundle.as_view(), name='create-course-bundle'),


    path('student-mock-assignments/', StudentMockAssignmentList.as_view(), name='student-mock-assignment-list'),
    path('submissions/', SubmissionListCreate.as_view(), name='submission-list-create'),
    path('evaluate-submission/', EvaluateSubmission.as_view(), name='evaluate-submission'),
    # path('submission-list/', SubmissionList.as_view(), name='submission-list'),
    path('student-courses/', StudentCourseListView.as_view(), name='student-course-list'),
    path('course-roadmap/<int:course_id>/', CourseRoadmapView.as_view(), name='course-roadmap'),
    path('skill-content/<str:skill>/', SkillContentView.as_view(), name='skill-content'),
    path('course-bundles/<int:course_id>/', CourseBundleListCreateView.as_view(), name='course-bundle-list-create'),
    path('course-bundle/<int:bundle_id>/', CourseBundleDetailView.as_view(), name='course-bundle-detail'),
    path('course/<int:course_id>/modules/', ModuleListCreateView.as_view(), name='module-list-create'),
    path('unlock-next-module/', UnlockNextModuleView.as_view(), name='unlock-next-module'),

    path('submissions/', SubmissionListCreate.as_view(), name='submission-list-create'),
    path('assign-course/', AssignCourseToStudent.as_view(), name='assign-course'),
]
