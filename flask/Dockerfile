FROM python:3.8.5-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . /app
CMD ["python3", "wsgi.py"]
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]