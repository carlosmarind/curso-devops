pipeline {
    agent { 
        docker 
            {
                image "node:24"
            }
    }
    stages {
        stage("CI de la aplicacion"){
            steps{
                sh "npm install"
                sh "ls -l"
                sh "hostname"
            }
        }
    }
}