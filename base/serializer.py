from os import name
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import filepath_to_uri, smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError

#Djoser
from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model
# User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password')






class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    IsAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id','username', 'email', 'name','IsAdmin']

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name 

    def get_IsAdmin(self, obj):
        return obj.is_staff

class UserSeralizerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username', 'email', 'name','IsAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


###### RESET PASSWORD

class RequestPasswordResetEmailSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    uidb64 = serializers.SerializerMethodField(read_only=True)
    current_site = serializers.SerializerMethodField(read_only=True)
    relativeLink = serializers.SerializerMethodField(read_only=True)
    #uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
    #current_site = get_current_site(request=request).domain

    class Meta:
        model = User
        fields = ['token', 'uidb64', 'current_site', 'relativeLink']

    def get_uidb64(self,obj):
        uidb64 = urlsafe_base64_encode(smart_bytes(obj.user.id))
        return uidb64

    def get_token(self, obj):
        token = RefreshToken.for_user(obj.user)
        return str(token.access_token)

    def get_current_site(self,obj):
        return obj.current_site 

    def get_relativeLink(self, obj):
        tokenSupp = RefreshToken.for_user(obj.user)
        uidb64Supp = urlsafe_base64_encode(smart_bytes(obj.user.id))
        relativeLink = reverse('password-reset-confirm', kwargs={'uidb64': uidb64Supp, 'token': tokenSupp})
        return str(relativeLink)

class NewPasswordSerializer(serializers.ModelSerializer):

    token = serializers.SerializerMethodField(read_only=True)
    uidb64 = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User 
        fields = ['token', 'uidb64']

    def get_token(self, obj):
        token = obj['token']
        return token

    def get_uidb64(self,obj):
        uidb64 = obj['uidb64']
        return uidb64
    
    


class ReviewtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewtSerializer(reviews, many=True)
        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class ProductSerializerImage(serializers.ModelSerializer):
    text = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ['image', 'text']

    def get_text(self, obj):
        return ('Image was uploaded')

class ProductSerializerImages(serializers.ModelSerializer):
    text = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ProductImages
        fields = ['images', 'text']

    def get_text(self, obj):
        return ('Images was uploaded')


class ProductSerializerImages2(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address =  ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
      