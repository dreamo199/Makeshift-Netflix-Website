from django.urls import path
from .views import RegisterView, ReviewView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),

    # LOGIN
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),

    path("reviews/add", ReviewView.as_view()),

]
