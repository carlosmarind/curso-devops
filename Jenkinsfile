pipeline {
    agent any
    stages{
        stage("Integracion continua"){
            agent { 
                docker 
                    {
                        image "node:24"
                    }
            }
            stages{
                stage("CI de la aplicacion - dependencias"){
                    steps{
                        sh "npm install"
                    }
                }
                stage("CI de la aplicacion - lint"){
                    steps{
                        sh "npm run lint"
                    }
                }
                stage("CI de la aplicacion - test"){
                    steps{
                        sh "npm run test"
                    }
                }
                stage("CI de la aplicacion - build"){
                    steps{
                        sh "npm run build"
                    }
                }
            }
        }
        stage("CI de la aplicacion - build dockerfile"){
            steps{
                sh "docker build -t curso-devops ."


                script{
                    def semantic = sh(
                        script: 'npm pkg get version| tr -d \'"\''
                        returnStdout:true
                    ).trim()
                    docker.withRegistry("https://index.docker.io/v1/","credencial-dh"){
                        sh 'docker tag curso-devops carlosmarind/curso-devops:latest'
                        sh "docker tag curso-devops carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker tag curso-devops carlosmarind/curso-devops:${semantic}"
                        sh 'docker push carlosmarind/curso-devops:latest'
                        sh "docker push carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker push carlosmarind/curso-devops:${semantic}"
                    }

                    docker.withRegistry("https://ghcr.io","credencial-gh"){
                        sh 'docker tag curso-devops ghcr.io/carlosmarind/curso-devops:latest'
                        sh "docker tag curso-devops ghcr.io/carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker tag curso-devops ghcr.io/carlosmarind/curso-devops:${semantic}"
                        sh 'docker push ghcr.io/carlosmarind/curso-devops:latest'
                        sh "docker push ghcr.io/carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker push ghcr.io/carlosmarind/curso-devops:${semantic}"
                    }
                }
            }
        }
    }
}