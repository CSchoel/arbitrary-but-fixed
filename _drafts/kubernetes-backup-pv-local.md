```bash
kubectl debug node/h02-frame01 --image=ubuntu -- sleep 600
kubectl cp node-debugger-h02-frame01-g9zws:host/var/lib/rancher/k3s/storage/pvc-05fb732f-8c62-4091-a04d-bd1f71064b76_default_repo-data-gitlab-gitaly-0 ./temp/k8s_backup
kubectl drain node/h02-frame01
```