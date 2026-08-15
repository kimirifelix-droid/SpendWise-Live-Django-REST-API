from django.contrib import admin
from .models import Expense

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('owner', 'amount', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('description', 'owner__username')
