from django.shortcuts import redirect

def entry(request):
    return redirect("http://127.0.0.1:5500/pages/signup.html")