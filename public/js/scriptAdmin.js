document.addEventListener('DOMContentLoaded', async () => {
  const userTableBody = document.getElementById('userTableBody');
  const userCardsContainer = document.getElementById('userCardsContainer');
  const userDetailsModal = document.getElementById('userDetailsModal');
  const refreshButton = document.getElementById('refreshUsers');
  const totalUsers = document.querySelector('#totalUsers')

  async function fetchUsers() {
    try {
      const response = await fetch('/api/admin/getusers');
      const users = await response.json();
      totalUsers.innerHTML = users.length
      renderUsers(users);

    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  }

  function renderUsers(users) {
    // Vider les anciennes données
    userTableBody.innerHTML = '';
    userCardsContainer.innerHTML = '';

    users.forEach(user => {
      // Affichage en tableau
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${user._id}</td>
        <td>${user.nom}</td>
        <td>${user.prenom}</td>
        <td>${user.email}</td>
        <td>${user.telephone}</td>
        <td>${user.formation}</td>
        <td>${user.niveau}</td>
        <td class="table-actions">
          <button class="action-btn view-btn" data-id="${user._id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn delete-btn" data-id="${user._id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      // Affichage en cartes
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
      userCard.innerHTML = `
        <div class="user-card-row">
          <span class="user-card-label">Nom:</span>
          <span>${user.nom} ${user.prenom}</span>
        </div>
        <div class="user-card-row">
          <span class="user-card-label">Email:</span>
          <span>${user.email}</span>
        </div>
        <div class="user-card-row">
          <span class="user-card-label">Téléphone:</span>
          <span>${user.telephone}</span>
        </div>
        <div class="user-card-row">
          <span class="user-card-label">Formation:</span>
          <span>${user.formation} (${user.niveau})</span>
        </div>
        <div class="user-card-actions">
          <button class="action-btn view-btn" data-id="${user._id}">
            <i class="fas fa-eye"></i> Voir
          </button>
          <button class="action-btn delete-btn" data-id="${user._id}">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        </div>
      `;

      // Ajout des événements
      tableRow.querySelector('.view-btn').addEventListener('click', () => showUserDetails(user));
      tableRow.querySelector('.delete-btn').addEventListener('click', () => deleteUser(user._id));
      userCard.querySelector('.view-btn').addEventListener('click', () => showUserDetails(user));
      userCard.querySelector('.delete-btn').addEventListener('click', () => deleteUser(user._id));

      userTableBody.appendChild(tableRow);
      userCardsContainer.appendChild(userCard);
    });
  }

  function showUserDetails(user) {
    const detailsContent = document.getElementById('userDetailsContent');
    detailsContent.innerHTML = `
      <h2>Détails de l'Utilisateur</h2>
      <div class="user-details">
        <p><strong>ID:</strong> ${user._id}</p>
        <p><strong>Nom:</strong> ${user.nom}</p>
        <p><strong>Prénom:</strong> ${user.prenom}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Téléphone:</strong> ${user.telephone}</p>
        <p><strong>Date de Naissance:</strong> ${new Date(user.dateNaissance).toLocaleDateString()}</p>
        <p><strong>Formation:</strong> ${user.formation}</p>
        <p><strong>Niveau:</strong> ${user.niveau}</p>
        <p><strong>Motivation:</strong> ${user.motivation}</p>
      </div>
    `;
    userDetailsModal.style.display = 'block';
  }

  function deleteUser(userId) {
    console.log('userId',userId)
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      fetch(`/users/delete/${userId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => fetchUsers()) // Rafraîchir la liste après suppression
        .catch(error => console.error('Erreur lors de la suppression:', error));
    }
  }

  // Bouton de rafraîchissement
  refreshButton.addEventListener('click', fetchUsers);

  // Fermer la modale des détails utilisateur
  document.querySelector('.close-modal').addEventListener('click', () => {
    userDetailsModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === userDetailsModal) {
      userDetailsModal.style.display = 'none';
    }
  });

  // Charger les utilisateurs au démarrage
  fetchUsers();
});

document.getElementById('printUsers').addEventListener('click', () => {
  // Cloner la table pour éviter de modifier l'originale
  let tableClone = document.getElementById('userTable').cloneNode(true);
  
  // Supprimer les colonnes des actions avant l'impression
  tableClone.querySelectorAll('.table-actions').forEach(el => el.remove());
  
  // Ouvrir une nouvelle fenêtre pour l'impression
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Liste des Utilisateurs</title>');
  printWindow.document.write('<link rel="stylesheet" href="/style/stylesAdmin.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h2>Liste des Utilisateurs</h2>');
  printWindow.document.write(tableClone.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  
  // Lancer l'impression
  printWindow.print();
});

document.getElementById('sendUsers').addEventListener('click', () => {
  // Cloner la table pour éviter de modifier l'originale
  let tableClone = document.getElementById('userTable').cloneNode(true);
  
  // Supprimer les colonnes des actions
  tableClone.querySelectorAll('.table-actions').forEach(el => el.remove());
  
  // Extraire le contenu sous forme de texte brut
  let rows = tableClone.querySelectorAll('tr');
  let tableText = '';

  rows.forEach(row => {
      let cells = row.querySelectorAll('td, th');
      let rowText = [];
      cells.forEach(cell => rowText.push(cell.innerText));
      tableText += rowText.join(' | ') + '\n';
  });

  // Encoder le texte pour les URL de partage
  let encodedText = encodeURIComponent("📋 *Liste des Utilisateurs*\n\n" + tableText);

  // Afficher les options de partage
  let shareOptions = `
      Choisissez une option pour partager :
      1️⃣ Facebook
      2️⃣ WhatsApp
      3️⃣ Email
  `;

  let choice = prompt(shareOptions);

  if (choice === '1') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedText}`, '_blank');
  } else if (choice === '2') {
      window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  } else if (choice === '3') {
      window.open(`mailto:?subject=Liste des utilisateurs&body=${encodedText}`, '_self');
  } else {
      alert('Option invalide');
  }
});
