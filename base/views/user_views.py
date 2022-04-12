from django.shortcuts import render , redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Product
from base.serializer import ProductSerializer, UserSerializer, UserSeralizerWithToken, RequestPasswordResetEmailSerializer, NewPasswordSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status, generics
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from .utils import Util
# from django.http import HttpResponsePermanentRedirect
# import os


# class CustomRedirect(HttpResponsePermanentRedirect):

#     allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


@api_view(['GET'])
@permission_classes([AllowAny])
def email_exist(request):
    print('jestem w funkcji email_exist')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSeralizerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSeralizerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


###### RESET PASSWORD

@api_view(['POST'])
def requestPasswordResetEmail(request):
    data = request.data
    email=data['email']

    #serializer = RequestPasswordResetEmailSerializer(email, many=False)

    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        current_site = get_current_site(request=request).domain
        token = RefreshToken.for_user(user)
        tokenStr = str(token.access_token)
        relativeLink = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        redirect_url = request.data.get('redirect_url', '')
        absurl = 'http://'+current_site + relativeLink
        email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Reset your passsword'}
        Util.send_email(data)

        class UserSupp():
            user = User.objects.get(email=email)
            current_site = get_current_site(request=request).domain
            redirect_url = request.data.get('redirect_url', '')
            

        #test = {'user':user, 'current_site':current_site}
        serializer = RequestPasswordResetEmailSerializer(UserSupp, many=False)
        #return Response(serializer.data)
        return Response('email został wysłany')

    #return Response(serializer.data)
    return Response('wybrany email nie istnieje')


@api_view(['GET'])
def passwordTokenCheckAPI(request, uidb64, token):


    # class UserSupp():
    #     uidb64 = uidb64
    #     token = token
    response = redirect('http://localhost:3000/newpassword')
    redirect_url = request.GET.get('redirect_url', 'http://localhost:3000/newpassword')
    #print('redirect_url-----------------------------------', redirect_url)

    try:
        id = smart_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=id)
        serializer = NewPasswordSerializer({'uidb64':uidb64,'token':token}, many=False)
        
    except:
        pass

    return response



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):  
    user = request.user #pobieramy bieżące dane Usera 
    serializer = UserSeralizerWithToken(user, many=False) #uzywamy classy UserSeralizerWithToken bo generujemy nowy token 

    #nowe dane z nowym tokenem
    data = request.data

    try:
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        #tworzenie nowego hasła
        user.password = make_password(data['password'])

        #zapisujemy nowy dane 
        user.save()
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):   
    user = User.objects.get(id=pk)
    
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
 
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')