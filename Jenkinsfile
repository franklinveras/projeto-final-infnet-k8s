pipeline {
  agent any

  environment {
    IMAGE_NAME = 'franklinveras/projeto-final'
    IMAGE_TAG = 'latest'
    DOCKER_CREDENTIALS_ID = 'xxxxxxxxxxxxxxxxxxxxxxxx'
  }

  stages {
    stage('Construindo a Imagem Docker') {
      steps {
        script {
          docker.build("${IMAGE_NAME}:${IMAGE_TAG}", ' file-service')
        }
      }
    }

    stage('Enviando a Imagem para o Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
            docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
          }
        }
      }
    }

    stage('Deploy no Kubernetes') {
      steps {
        sh 'kubectl apply -f kubernetes'
      }
    }
  }

  post {
    success {
      echo 'Deploy finalizado com sucesso!'
    }
    failure {
      echo 'Falha no deploy'
    }
  }
}
