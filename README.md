# Gestion des Tâches

Bienvenue dans le projet **Gestion des Tâches**. Cette application MERN (MongoDB, Express, React, Node.js) permet aux utilisateurs de gérer leurs tâches avec une interface intuitive et des fonctionnalités de **Drag and Drop**.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)

---

## Fonctionnalités

- **Authentification Utilisateur** : Connexion sécurisée avec JWT.
- **Ajouter des Tâches** : Créer une nouvelle tâche avec titre et description.
- **Mettre à Jour une Tâche** : Modifier le titre et la description.
- **Supprimer une Tâche** : Supprimer une tâche existante.
- **Changer le Statut des Tâches** : Déplacer les tâches entre **"À Faire"** et **"Terminées"** avec Drag and Drop.
- **Interface Moderne** : Utilisation de **Material-UI** pour un design réactif.
- **Persistance des Données** : Sauvegarde des tâches dans une base MongoDB.

---

## Technologies Utilisées

- **Backend** : Node.js, Express.js, MongoDB, Mongoose
- **Frontend** : React.js, React-Beautiful-DND, Material-UI, Axios
- **Authentification** : JSON Web Token (JWT)
- **Outils** : npm, Postman, Visual Studio Code

---

## Installation

### Prérequis

- **Node.js** (version 14.x ou supérieure)
- **MongoDB** (installé localement ou via un service cloud comme Atlas)
- **npm** ou **yarn**

### Étapes d'Installation

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/MariemSoualhia/To-Do-List-mern-project.git
   cd gestion-taches-mern

   ```

2. Installez les dépendances pour le backend :

   ```
   cd backend
   npm install
   ```

3. Installez les dépendances pour le frontend :

   ```
   cd ../frontend
   npm install

   ```

4. Installez les dépendances pour le backend :

   ```
   cd backend
   npm install
   ```

5. Installez les dépendances pour le frontend :

   ```
   cd ../frontend
   npm install

   ```

### Configuration

Créez un fichier .env dans le dossier backend et ajoutez les configurations nécessaires :

```
# .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/gestion-taches
JWT_SECRET=votre_secret_jwt
```

### Utilisation

1. Démarrez le backend :
   ```
   cd backend
   npm start
   ```
2. Démarrez le frontend :
   ```
   cd ../frontend
   npm start
   ```

### Structure du Projet

Voici la structure du projet :

```
gestion-taches-mern/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   ├── package.json
│   └── public/
│
└── README.md

```
