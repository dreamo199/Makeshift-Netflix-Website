from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Review

class RegisterUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    bio = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    country = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ["first_name", 'last_name', "username", "email", "password",
                  "avatar", "bio", "phone", "country"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = {
            "avatar": validated_data.pop("avatar", None),
            "bio": validated_data.pop("bio", ""),
            "phone": validated_data.pop("phone", ""),
            "country": validated_data.pop("country", ""),
        }

        user = User.objects.create_user(**validated_data)

        # Add profile fields
        profile = user.userprofile
        for key, value in profile_data.items():
            setattr(profile, key, value)
        profile.save()

        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["__all__"]
        read_only_fields = ("user,")
