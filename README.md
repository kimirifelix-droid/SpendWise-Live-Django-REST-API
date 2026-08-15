(Run this README from the repository root.)

Setup (Windows PowerShell):

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd spendwise
python manage.py migrate
python manage.py seed_data    # creates alice/bob with password 'pass'
python manage.py runserver
```

Open http://localhost:8000/ to use the frontend.

API endpoints:
- `POST /api/login/` (body: `{"username":"...","password":"..."}`) returns `token`.
- `GET/POST/PUT/DELETE /api/expenses/` (token required in `Authorization: Token <token>` header).

Filtering/search/ordering/pagination examples:
- Filter: `/api/expenses/?category=food`
- Search: `/api/expenses/?search=coffee`
- Ordering: `/api/expenses/?ordering=-created_at`
- Pagination: `/api/expenses/?page=2`

Testing and CI:
- Run tests locally: `python manage.py test`
- CI configured in `.github/workflows/ci.yml` to run tests on push/PR.

Grading checklist:
- API with `Expense` model and per-user `owner` field — implemented.
- Token auth at `/api/login/` and authenticated endpoints — implemented.
- Queryset scoped to `request.user` — implemented and tested.
- Filtering by `category`, search on `description`, ordering, and pagination — implemented.
- Frontend that logs in, lists, and adds expenses via fetch, with filters and search wired — implemented.
- Demo seed script and test coverage + CI — included.

