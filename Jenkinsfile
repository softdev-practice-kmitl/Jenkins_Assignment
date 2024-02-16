pipeline {
    agent any
    stages {
        stage('Clone') {
            agent {
                label 'vm2'
            }
            steps {
               git branch: 'main', url: 'https://github.com/softdev-practice-kmitl/Jenkins_Assignment.git'
            }
        }
        stage('Install Packet') {
            agent {
                label 'vm2'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Run Unittest') {
            agent {
                label 'vm2'
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Run Robot') {
            agent {
                label 'vm2'
            }
            steps {
                echo 'Create Container'
                sh 'docker compose -f ./compose.dev.yaml up -d --build'
                echo 'Cloning Robots'
                dir('./robot/') {
                    git branch: 'main', url: 'https://github.com/softdev-practice-kmitl/Jenkins_Robot.git'
                }
                echo 'Runing Robot'
                sh 'cd ./robot && robot ./test-api.robot'
            }
        }
        stage('Building Image 🛠️') {
            agent {
                label 'vm2'
            }
            steps {
                sh 'docker build -t jenkins-assignment . && docker tag jenkins-assignment cheiby/jenkins-assignment:lastest'
            }
        }
        stage('Push ⬆️') {
            agent{
                label 'vm2'
            } 
            steps {
                sh 'docker push cheiby/jenkins-assingment:lastest'
            }
        }
        stage('Clean Workspace') {
            agent {
                label 'vm2'
            }
            steps {
                echo 'DownTime'
                sh 'docker compose -f ./compose.dev.yaml down'
                sh 'docker system prune -a -f'
            }
        }
        stage('Running Preprod') {
            agent{
                label 'vm3'
            }
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}