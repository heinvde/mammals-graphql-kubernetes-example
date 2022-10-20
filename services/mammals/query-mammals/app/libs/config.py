import os

class Config:
    def __init__(self, environment='dev'):
        self.environment = environment
        self.config = {}

    def setup(self, app):
        app.config.from_prefixed_env('MAMMALS')
