/* Partie 1 */

function poucesVersCm() {
    let valeur = parseFloat(document.getElementById("valeur").value);
    let resultat = valeur * 2.54;
    document.getElementById("resultat").textContent = " pouces ==> " + resultat.toFixed(0) + " cm";
}

function cmVersPouces() {
    let valeur = parseFloat(document.getElementById("valeur").value);
    let resultat = valeur / 2.54;
    document.getElementById("resultat").textContent = " cm ==> " + resultat.toFixed(0) + " pouces";
}

function celciusVersFarenheit() {
    let valeur = parseFloat(document.getElementById("valeur").value);
    let resultat = (valeur * 9/5) + 32;
    document.getElementById("resultat").textContent = " celcius ==> " + resultat.toFixed(1) + " farenheit";
}

function farenheitVersCelcius() {
    let valeur = parseFloat(document.getElementById("valeur").value);
    let resultat = (valeur - 32) * 5/9;
    document.getElementById("resultat").textContent = " farenheit ==> " + resultat.toFixed(1) + " celcius";
}


/* Partie 2 */

function afficherMessage() {
    // Recuperer les valeurs des inputs et les mettre dans des variables
    let var1 = document.getElementById('nomPre').value;
    let var2 = parseInt(document.getElementById('niveau').value);
    let zoneAffichage = document.getElementById('affichage');

    // Verifier la validite du niveau inscrit par l'utilisateur
    if (var2 >= 1 && var2 <= 6) {
        // Cas ou le niveau est valide
        zoneAffichage.innerHTML = "<h" + var2 + ">" + "Bonjour " + var1 + " niveau=" + var2 + "</h" + var2 + ">";
        zoneAffichage.style.color = "green"; // Texte vert si les donnees sont valides
    } else {
        // Cas ou le niveau est invalide
        zoneAffichage.innerHTML = '<p>Erreur le niveau doit etre entre 1 et 6</p>';
        zoneAffichage.style.color = "red"; // Texte rouge s'il y a une erreur
    }
}


/* Partie 3 */

$(document).ready(function () {

    // Menu des plats
    let monMenu = {"Escargot": {cat: "Entree", image: "escargot.jpg", prix: 5.50}, 
                   "Salade verte" : {cat: "Entree", image: "salade2.jpg", prix: 5.95},
		           "Salade César": {cat: "Entree", image: "salade.jpg", prix: 6.95},
		           "Spaghetti": {cat: "Principal", image: "spaghetti.jpg", prix: 15.95},
		           "Steak": {cat: "Principal", image: "steak.jpg", prix: 25.95},
		           "Pizza": {cat: "Principal", image: "pizza.jpg", prix: 17.95},
                   "Crème glacée": {cat: "Dessert", image: "cremeglacee.jpg", prix: 4.25},
                   "Gateau": {cat: "Dessert", image: "gateau.jpg", prix: 4.95},
                   "Pouding": {cat: "Dessert", image: "pouding.jpg", prix: 3.95},
                   "Café / Thé": {cat: "Boisson", image: "cafe.jpg", prix: 2.50},
                   "Boisson gazeuse": {cat: "Boisson", image: "boisson.jpg", prix: 2.95},
                  };
    
    // Gestion de l'affichage des sous-menus
    $('li').on('click', function() {
        // Verifier si l'element est deja affiche
        if ($(this).hasClass('liclasseaff')) {
            return;
        }
        // Reinitialiser les autres menus
        let selelement = $(this).parent();
        selelement.find('li').removeClass('liclasseaff').find('ul').hide();
        // Afficher le sous-menu
        $(this).addClass('liclasseaff').children('ul').slideToggle(500);
    });

    // Gestion du click sur un plat
    $('li li').on('click', function() {
        // Recuperation de l'element de objet
        let itemMenu = $(this).text();

        if (monMenu[itemMenu]) {
            let cat = monMenu[itemMenu].cat;
            let image = monMenu[itemMenu].image;
            let prix = monMenu[itemMenu].prix;
            
            let idPhoto = "#img" + cat;
            let idPrix = "#prix" + cat;

            // Mettre a jour l'image et le prix
            $(idPhoto).attr("src", "images/" + image);
            $(idPrix).text(prix.toFixed(2) + "$");
        }

    });


    // Calcul du prix total de la commande
    $('button').on('click', function(e) {
        // Recuperer les prix pour chaque categorie
        let varprixEntree = parseFloat($("#prixEntree").html());
        let varprixPrincipal = parseFloat($("#prixPrincipal").html());
        let varprixDessert = parseFloat($("#prixDessert").html());
        let varprixBoisson = parseFloat($("#prixBoisson").html());

        // Verification et gestion des valeurs NaN
            if (isNaN(varprixEntree))
                varprixEntree = 0;
            if (isNaN(varprixPrincipal))
                varprixPrincipal = 0;
            if (isNaN(varprixDessert))
                varprixDessert = 0;
            if (isNaN(varprixBoisson))
                varprixBoisson = 0;

        // Calcul du prix avant taxes
        let sousTotal = varprixEntree + varprixPrincipal + varprixDessert + varprixBoisson;

        // Calcul des taxes
        let tps = sousTotal * 0.05;
        let tvq = sousTotal * 0.09975;

        // Calcul du total final
        let totalAvecTaxes = sousTotal + tps + tvq;

        // Affichage des resultats
         $('#total').html(
            "Total: " + sousTotal.toFixed(2) + "$" +
            " taxes: " + ((tps + tvq).toFixed(2)) + "$" +
            " - " + totalAvecTaxes.toFixed(2) + "$"
         );
        
    });

});
