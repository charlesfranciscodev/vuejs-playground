import datetime
import sys
import traceback
from functools import wraps

from flask import Blueprint, session, redirect, render_template, url_for


error_blueprint = Blueprint(
    "error",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


def custom_error_handler(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception:
            date_time = "{}\n".format(
                datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            )
            exception_type, exception, stack_trace = sys.exc_info()
            lines = [date_time] + traceback.format_tb(stack_trace)
            session["error_message"] = "{}: {}".format(exception_type, exception)
            session["stack_trace"] = lines
            return redirect(url_for("error.error_route"))
    return decorated_function


@error_blueprint.route("/error")
def error_route():
    return render_template(
        "error.html",
        error_message=session["error_message"],
        stack_trace=session["stack_trace"]
    )
