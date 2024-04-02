import requests
import json
import sys
with open('../config.json') as f: data = json.load(f)

def log(title, description):
    data = {
        "embeds": [
            {
                "title": title,
                "description": description,
                "color": 0x7289DA
            }
        ]
    }
    headers = {
        'Content-Type': 'application/json'
    }
    
    response = requests.post(webhook, data=json.dumps(data), headers=headers)
    if response.status_code == 200:
        return True
    else:
        return False

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('<title> <description>')
        sys.exit(1)
        
    
    webhook = data["log_webhook"]
    title = sys.argv[1]
    description = sys.argv[2]
    
    log(title, description)
