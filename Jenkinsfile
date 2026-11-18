// Jenkins Pipeline başlangıcı.
pipeline {

    // Uygun bir Jenkins executor üzerinde çalışır.
    agent any

    // Otomatik checkout işlemini kapatıyoruz.
    options {
        skipDefaultCheckout(true)
    }

    // Pipeline aşamaları.
    stages {

        // STAGE 1: CHECKOUT
        stage('Checkout') {

            steps {

                // Jenkins Console Output'a mesaj yazdırır.
                echo 'STAGE 1: GitHub kodlari aliniyor...'

                // GitHub repository'sinden kodları çeker.
                checkout scm

                // Dosyaları listeler.
                sh 'ls -la'

                echo 'STAGE 1: Checkout basariyla tamamlandi.'
            }
        }
    }
}