FROM python:3.8

RUN mkdir /app
WORKDIR /app

ADD requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

ADD . /app/

EXPOSE 5000
CMD ["python", "/app/main.py"]