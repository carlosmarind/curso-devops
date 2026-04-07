pipeline {
    agent any
    stages {
        stage("Integracion continua") {
            agent {
                docker {
                    image "node:24"
                }
            }
            stages {
                stage("CI de la aplicacion - version") {
                    steps {
                        script {
                            env.APP_SEMANTIC_VERSION = sh(
                                script: 'npm pkg get version | tr -d \'"\'',
                                returnStdout: true
                            ).trim()
                            echo "Version semantica detectada: ${env.APP_SEMANTIC_VERSION}"
                        }
                    }
                }
                stage("CI de la aplicacion - dependencias") {
                    steps {
                        sh "npm install"
                    }
                }
                stage("CI de la aplicacion - lint") {
                    steps {
                        sh "npm run lint"
                    }
                }
                stage("CI de la aplicacion - test") {
                    steps {
                        sh "npm run test"
                    }
                }
                stage("CI de la aplicacion - build") {
                    steps {
                        sh "npm run build"
                    }
                }
            }
        }
        stage("CI de la aplicacion - build dockerfile") {
            steps {
                sh "docker build -t curso-devops ."
                script {
                    
                    if (!env.APP_SEMANTIC_VERSION?.trim()) {
                        error("APP_SEMANTIC_VERSION no definida en el stage de anterior")
                    }

                    docker.withRegistry("https://index.docker.io/v1/", "credencial-dh") {
                        sh 'docker tag curso-devops carlosmarind/curso-devops:latest'
                        sh "docker tag curso-devops carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker tag curso-devops carlosmarind/curso-devops:${env.APP_SEMANTIC_VERSION}"
                        sh 'docker push carlosmarind/curso-devops:latest'
                        sh "docker push carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker push carlosmarind/curso-devops:${env.APP_SEMANTIC_VERSION}"
                    }

                    docker.withRegistry("https://ghcr.io", "credencial-gh") {
                        sh 'docker tag curso-devops ghcr.io/carlosmarind/curso-devops:latest'
                        sh "docker tag curso-devops ghcr.io/carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker tag curso-devops ghcr.io/carlosmarind/curso-devops:${env.APP_SEMANTIC_VERSION}"
                        sh 'docker push ghcr.io/carlosmarind/curso-devops:latest'
                        sh "docker push ghcr.io/carlosmarind/curso-devops:${env.BUILD_NUMBER}"
                        sh "docker push ghcr.io/carlosmarind/curso-devops:${env.APP_SEMANTIC_VERSION}"
                    }
                }
            }
        }
    }
}