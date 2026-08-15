from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from .models import Expense

User = get_user_model()

class ExpenseAPITests(APITestCase):
    def setUp(self):
        self.alice = User.objects.create_user(username='alice', password='pass')
        self.bob = User.objects.create_user(username='bob', password='pass')
        Expense.objects.create(owner=self.alice, amount=5.00, description='Coffee', category='food')
        Expense.objects.create(owner=self.alice, amount=10.00, description='Lunch', category='food')
        Expense.objects.create(owner=self.bob, amount=20.00, description='Taxi', category='transport')

    def test_token_login_and_access(self):
        resp = self.client.post('/api/login/', {'username': 'alice', 'password': 'pass'}, format='json')
        self.assertEqual(resp.status_code, 200)
        token = resp.data.get('token')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        r = self.client.get('/api/expenses/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(len(r.data['results']), 2)

    def test_per_user_isolation(self):
        resp = self.client.post('/api/login/', {'username': 'bob', 'password': 'pass'}, format='json')
        token = resp.data.get('token')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        r = self.client.get('/api/expenses/')
        self.assertEqual(len(r.data['results']), 1)
