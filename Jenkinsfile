pipeline {
    agent {
        label "jenkins-nodejs"
    }
    environment {
      ORG               = 'smlsunxie'
      APP_NAME          = 'node-http'
      CHARTMUSEUM_CREDS = credentials('jenkins-x-chartmuseum')
    }
    stages {
      stage('CI Build and push snapshot') {
        when {
          branch 'PR-*'
        }
        environment {
          PREVIEW_VERSION = "0.0.0-SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
          PREVIEW_NAMESPACE = "$APP_NAME-$BRANCH_NAME".toLowerCase()
          HELM_RELEASE = "$PREVIEW_NAMESPACE".toLowerCase()
          NODE_ENV = "preview"
        }
        steps {
          container('nodejs') {
            sh "npm install && npm install mysql"
            sh "CI=true DISPLAY=:99 npm test"

            sh 'export VERSION=$PREVIEW_VERSION && skaffold build -f skaffold.yaml'


            sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:$PREVIEW_VERSION"
          }

          dir ('./charts/preview') {
           container('nodejs') {
             sh "make preview"
             sh "jx preview --app $APP_NAME --dir ../.."
           }
          }
        }
      }
      stage('Build Release') {
        when {
          branch 'master'
        }
        steps {
          container('nodejs') {
            // ensure we're not on a detached head
            sh "git checkout master"
            sh "git config --global credential.helper store"

            // jx 在安裝時已有設置 api token，此指令將會把 token 載入，讓建置過程中有足夠的權限
            sh "jx step git credentials"
            // so we can retrieve the version in later steps

            // 寫入這次發布的版號
            sh "echo \$(jx-release-version) > VERSION"
          }
          dir ('./charts/node-http') {
            container('nodejs') {
              // 更新 helm 的版號
              sh "make tag"
            }
          }
          container('nodejs') {
            sh "npm install && npm install mysql"
            sh "CI=true DISPLAY=:99 npm test"

            // 透過 skaffold 建置新版號的 image
            sh 'export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml'

            // 建置前，進行 CVE 檢查，CVE 的英文全名是 「Common Vulnerabilities & Exposures」 一般資安弱點及漏洞
            sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:\$(cat VERSION)"
          }
        }
      }
      stage('Promote to Environments') {
        when {
          branch 'master'
        }
        steps {
          dir ('./charts/node-http') {
            container('nodejs') {
              // 對 github 或 gitlab 發布 changelog
              sh 'jx step changelog --version v\$(cat ../../VERSION)'

              // release the helm chart
              sh 'jx step helm release'

              // promote through all 'Auto' promotion Environments
              // 發布版本，到 staging env
              sh 'jx promote -b --all-auto --timeout 1h --version \$(cat ../../VERSION)'
            }
          }
        }
      }
    }
    post {
        always {
            cleanWs()
        }
    }
  }
