import subprocess
import requests
import flask

from helpers import parse_data

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def get_service1_data():
  """
  Handles GET requests to the root route and returns system data from Service 1,
  along with data from Service 2. If Service 2 is unreachable, an error message
  is returned instead.

  Returns:
    Response: A JSON response containing both Service 1 and Service 2 data.
  """
  service1_data = {
    # Get the IP address of the host machine
    "ip_address": subprocess.getoutput("hostname -I").strip(),

    # Get the list of running processes and parse the output
    "running_processes": parse_data(subprocess.getoutput("ps -ax").strip(), 4),

    # Get available disk space for the root directory and parse the output
    "available_disk_space": parse_data(subprocess.getoutput("df -h /").strip()),

    # Get the time since the last system boot
    "time_since_last_boot": subprocess.getoutput("uptime -p").strip()
  }

  try:
    service2_data = requests.get("http://service2:8080").json()
  except requests.exceptions.RequestException as e:
    service2_data = {"error": str(e)}
  
  return flask.jsonify({
    "Service 1": service1_data,
    "Service 2": service2_data
  })

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8199)

