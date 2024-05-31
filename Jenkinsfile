pipeline 
    {
    environment 
    {
        dockerimagename = "raksha001/devops-task-mgmt-app"
        dockerImage = ""
    }
    agent any
    stages 
    {
        stage('Checkout')
        {
            steps
            {
                echo "Code checked out"
            }        
        }
        stage('SonarCloud') 
        {
            environment 
            {
                SCANNER_HOME = tool 'sonar_devops'
                ORGANIZATION = "raksha001"
                PROJECT_NAME = "Raksha001_Task_Mgmt_App"
            }
            steps 
            {
                withSonarQubeEnv('sonar_devops') 
                {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.organization=$ORGANIZATION \
                    -Dsonar.java.binaries=build/classes/java/ \
                    -Dsonar.projectKey=$PROJECT_NAME \
                    -Dsonar.sources=.'''
                }
            }
        }
        stage('Selenium testing')
        {
           steps
           {
               echo "yet to do"
           }
        }
        stage('Docker Image Build') 
        { 
            steps 
            {
                script 
                    {
                        // Build the Docker image
                        dockerImage = docker.build("${dockerimagename}:app")
                    }
            }
        }
        stage('Pushing Image') 
        {
            environment 
            {
                registryCredential = 'docker_token'
            }
            steps
            {
                script 
                {
                    docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) 
                    {
                        dockerImage.push("task_mgmt_app")
                    }
                }
            }
        }

        stage('Run Docker Images') {
            steps {
                script {
                    // Run the frontend Docker image
                    docker.image("${dockerimagename}:app").run('-d -p 8087:8087')
                    
                }
            }
        }
        // stage('Deploying Frontend Container to Minikube') 
        // {
        //     steps 
        //     {
        //         script 
        //         {
        //                 // kubernetesDeploy (configs: 'deploymentservice.yaml', kubeconfigId: 'kubernetes_token')
        //                 // Apply Deployment
        //                 //sh "kubectl apply -f deployment.yaml --validate=false"
        //                 // Apply Service (if needed)
        //                 // sh "kubectl apply -f service.yaml --validate=false"
        //                 // Wait for the Deployment to be ready
        //                 //{
        //                     //waitForDeployment("expense-management-frontend")
        //                 //}
        //         }
        //     }
        // }
        stage('Docker build')
        {
          steps
          {
               echo "yet to do"
           }
        }
    }
}

def waitForDeployment(deploymentName) {
    def count = 0
    while (count < 12) { // Check every 30 seconds for up to 6 minutes
        def deploymentStatus = sh(script: "kubectl get deployment ${deploymentName} -o jsonpath='{.status.readyReplicas}'", returnStdout: true).trim()
        if (deploymentStatus == "1") {
            echo "Deployment ${deploymentName} is ready"
            return
        } else {
            count++
            echo "Waiting for Deployment ${deploymentName} to be ready (${count * 30}s)"
            sleep(30)
        }
    }
    error "Deployment ${deploymentName} did not become ready within the timeout period"
}
