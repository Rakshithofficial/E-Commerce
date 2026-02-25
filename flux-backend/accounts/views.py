from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=400)

    User.objects.create_user(username=username, password=password)
    return Response({'message': 'Signup successful'})


@csrf_exempt
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=401)

    django_login(request, user)

    return Response({
        'message': 'Login successful',
        'user': user.username
    })


@csrf_exempt
@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({'message': 'Logged out'})


@api_view(['GET'])
def me(request):
    if request.user.is_authenticated:
        return Response({
            'logged_in': True,
            'username': request.user.username
        })

    return Response({'logged_in': False})