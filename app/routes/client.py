"""
.. module:: client
    :synopsis: All routes on the ``client`` Blueprint.

.. moduleauthor:: Dan Schlosser <dan@danrs.ch>
"""

from flask import Blueprint, render_template
from app.models import Event, BlogPost
from datetime import datetime, date
from mongoengine import Q

client = Blueprint('client', __name__)

_resources = None
_labs_data = None
_companies = None


@client.route('/', methods=['GET'])
def index():
    """View the client homepage.

    **Route:** ``/``

    **Methods:** ``GET``
    """

    all_events = (Event.objects(
        Q(published=True,
          end_date__gt=date.today()) |
        Q(published=True,
          end_date=date.today(),
          end_time__gt=datetime.now().time())))
    events = all_events.order_by('start_date', 'start_time')[:4]

    all_blog_posts = BlogPost.objects(published=True).order_by('-date_published')
    blog_post = all_blog_posts[0] if all_blog_posts else None

    return render_template('index.html',
                           events=events,
                           blog_post=blog_post)
