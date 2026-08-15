Release v1.0 — SpendWise Live

This release packages the SpendWise Django REST API for submission.

Contents:
- Django REST API with `Expense` model (per-user `owner`), DRF viewset, serializers.
- Token authentication endpoint at `/api/login/`.
- Frontend served at `/` (single `index.html`) that logs in, lists, filters, searches, orders, paginates, and adds expenses.
- `seed_data` management command to create demo users (`alice`/`bob`, password `pass`).
- Tests in `expenses/tests.py` and CI workflow in `.github/workflows/ci.yml`.
- Docker support: `Dockerfile` and `docker-compose.yml`.

Submission checklist (what I've included):
- [x] `README.md` with setup, demo script, and grading checklist.
- [x] `requirements.txt` pinned.
- [x] `Dockerfile` + `docker-compose.yml`.
- [x] Tests pass locally (`python manage.py test`).
- [x] CI workflow present (`.github/workflows/ci.yml`).
- [x] Seed data command: `python manage.py seed_data`.

How to verify quickly:

```bash
python -m venv venv
venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cd spendwise
python manage.py migrate
python manage.py seed_data
python manage.py runserver
# open http://localhost:8000/
```

Recording checklist for demo:
- Show login as `alice` (`pass`), list of Alice's expenses.
- Add one expense from the frontend and show it appears.
- Log out, log in as `bob` (`pass`) and show Bob's different data.
- Show filtering (category), searching, ordering, and pagination.

Tagging & release: This commit will be tagged `v1.0` in git for submission.
