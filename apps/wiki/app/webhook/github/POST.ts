import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'node:child_process'

export async function POST(request: NextRequest, { params }: Params) {
  console.debug({ file, params })
  request.json()
    .then((payload) => {
      console.debug('json', payload)

      if (payload.ref === 'refs/heads/main') {
        restart()
      }
    })

  return NextResponse.json({ message: 'ok' }, { status: 200 })
}

type Params = {
  params: {
    id: string
    method: string
  }
}
const file = '/webhook/github/POST'
const restart = () => {
  console.info('restart deployment')

  const child = exec(`APISERVER=https://kubernetes.default.svc \
SERVICEACCOUNT=/var/run/secrets/kubernetes.io/serviceaccount \
NAMESPACE=\$(cat \${SERVICEACCOUNT}/namespace) \
TOKEN=\$(cat \${SERVICEACCOUNT}/token) \
CACERT=\${SERVICEACCOUNT}/ca.crt \
DEPLOYMENT=deptno-dev \
; curl -s --cacert \${CACERT} -X PATCH -H "Authorization: Bearer \${TOKEN}" -H "Content-Type: application/strategic-merge-patch+json" --data "{\\"spec\\":{\\"template\\":{\\"metadata\\":{\\"annotations\\":{\\"kubectl.kubernetes.io/restartedAt\\":\\"\\$(date '+%Y-%m-%dT%H:%M:%S%:z')\\"}}}}}" \${APISERVER}/apis/apps/v1/namespaces/\${NAMESPACE}/deployments/\${DEPLOYMENT}`, (error, stdout, stderr) => {
      if (error) {
        return console.error(`command error: ${error}`);
      }
      console.info(`command stdout: ${stdout}`);
      if (stderr) {
        console.error(`command stderr: ${stderr}`);
      }
    })
  child.on('exit', (code) => {
    console.info(`command exit code ${code}`);
  })
}
