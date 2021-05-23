document.addEventListener('DOMContentLoaded', () =>{
    const skills = document.querySelector(".lista-conocimientos")

    if(skills) {
        skills.addEventListener('click', agregrarSkills)
    }
})
const skills = new Set();
const agregrarSkills = e => {
    if(e.target.tagName ==='LI'){
        if(e.target.classList.contains('activo')){
            //TODO Quitarlo del set y quitar la clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo')
        } else {
            //TODO Agregarlo al set y agregar a la clase
            skills.add(e.target.textContent);
            e.target.classList.add('activo')
        }
    }

    const skillsArray = [...skills]
    document.querySelector('#skills').value = skillsArray
}
