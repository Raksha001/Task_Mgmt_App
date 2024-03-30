pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                cleanWs()
                sh 'node --version && npm i'
            }
        }
    }
}
