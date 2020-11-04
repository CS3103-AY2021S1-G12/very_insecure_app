#! /bin/bash
set -o errexit
set -o pipefail

gcloud compute instances start very-insecure-app --zone asia-southeast1-b
IP=$(gcloud compute instances describe very-insecure-app \
    --zone='asia-southeast1-b'\
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

gcloud compute ssh very-insecure-app \
    --zone asia-southeast1-b\
    --command 'rm -rf ~/app \
            && git clone https://github.com/CS3103-AY2021S1-G12/very_insecure_app.git ~/app \
            && cd ~/app \
            && docker volume create --name=app-db || true \
            && docker-compose up --build -d'

if [[ -z ${DUCKDNS_TOKEN} ]]; then
    echo "DuckDNS token not set, deployed without updating DNS records."
else
    curl "https://www.duckdns.org/update?domains=very-secure-app&token=${DUCKDNS_TOKEN}&ip=${IP}&verbose=true"
fi
