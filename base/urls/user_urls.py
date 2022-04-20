from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path("login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("", views.getUsers, name="product"),
    path("profile/", views.getUserProfile, name="products"),
    path("profile/update/", views.updateUserProfile, name="user-profile-update"),
    path("register/", views.registerUser, name="register"),
    path("<str:pk>/", views.getUsersById, name="user"),
    path("update/<str:pk>/", views.updateUser, name="user-update"),
    path("delete/<str:pk>/", views.deleteUser, name="user-delete"),
    path("email_exist/", views.email_exist, name="email-exist"),
]
