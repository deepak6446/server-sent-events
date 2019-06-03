# server-sent-events

medium: https://medium.com/@deepak.r.poojari/pub-sub-model-using-sse-server-sent-events-97ab08eb36a
benchmark: https://streamdata.io/blog/benchmark-server-sent-events-versus-polling/

# running go lang process in production
copy file running_go_as_service to /etc/systemd/system/service_name.service
sudo systemctl enable service_name
sudo systemctl start service_name

check logs
sudo journalctl -u service_name.service

any change in file restart deamon
sudo systemctl daemon-reload
sudo systemctl restart service_name



