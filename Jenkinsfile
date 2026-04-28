pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    ansiColor('xterm')
  }

  environment {
    NODE_VERSION = '20'
    IMAGE_NAME = 'agenda-contatos-api'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node') {
      steps {
        script {
          def nodeHome = tool name: "node-${env.NODE_VERSION}", type: 'nodejs'
          env.PATH = "${nodeHome}/bin:${env.PATH}"
        }
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build Docker Image') {
      when {
        anyOf {
          branch 'main'
          buildingTag()
        }
      }
      steps {
        script {
          def imageTag = env.TAG_NAME ?: "${env.BUILD_NUMBER}"
          sh "docker build -t ${env.IMAGE_NAME}:${imageTag} ."
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo 'Pipeline finalizada com sucesso.'
    }
    failure {
      echo 'Pipeline falhou. Verifique os logs das etapas.'
    }
  }
}
