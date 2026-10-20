# VSO UI Helm Test

A small static frontend for practising GitHub Actions, Docker, Amazon ECR, Amazon EKS, and Helm.

## Repository contents

- `src/`: static Apache-served frontend
- `tests/`: Jest tests
- `Dockerfile`: builds the frontend image
- `helm/vso-ui/`: Helm chart with Deployment and Service
- `.github/workflows/test-deploy.yml`: CI/CD workflow

## Run tests locally

Requires Node.js 22.

```bash
npm install
npm test
```

Commit the generated `package-lock.json`; GitHub Actions uses `npm ci`.

## Build and run locally

```bash
docker build -t vso-ui-helm-test:local .
docker run --rm -p 8080:80 vso-ui-helm-test:local
```

Open http://localhost:8080.

## GitHub Actions prerequisites

Create these repository secrets under Settings -> Secrets and variables -> Actions:

- `AWS_ROLE_ARN`: IAM role ARN trusted for GitHub OIDC
- `SONAR_HOST_URL`: SonarQube server URL
- `SONAR_TOKEN`: SonarQube analysis token

The IAM role needs ECR push permissions and EKS access. Configure the cluster access entry/RBAC permissions for the role before deployment. Do not use AWS root credentials in GitHub Actions.

The workflow assumes:
- AWS region: `us-east-1`
- EKS cluster: `EKS-Demo`
- ECR repository: `vso-ui-test`
- GitHub branch: `test`
- Helm release: `vso-ui-test`
- Kubernetes namespace: `vso-test`

The chart defaults to a `LoadBalancer` Service, which can create billable AWS load-balancer resources. Change `service.type` to `ClusterIP` for a lower-cost initial test and use `kubectl port-forward`.

## Push to GitHub

Create an empty repository named `vso-ui-helm-test`, then:

```bash
git init
git add .
git commit -m "Add VSO frontend Helm test application"
git branch -M test
git remote add origin https://github.com/<YOUR-USERNAME>/vso-ui-helm-test.git
git push -u origin test
```

Replace `<YOUR-USERNAME>` with your GitHub username.
