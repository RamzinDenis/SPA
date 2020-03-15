const app = {
    pages: [],
    show: new Event('show'),
    init: function() {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach(page => page.addEventListener('show', app.pageShown))

        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', app.nav))

        history.replaceState({}, 'Home', '#home');

        window.addEventListener("hashchange", app.poppin)
    },
    nav: function(e) {
       const currentPage = e.target.dataset.target;
       navFunc(e,true,currentPage)
    },
    pageShown: function(e) {
        console.log('Page', e.target.id, 'just shown')
        const h1 = e.target.querySelector('h1')
        h1.classList.add('big');
        setTimeout( () => h1.classList.remove('big') , 1000)
    },
    poppin: function(e) {
        console.log(location.hash, 'popstate event')
        let hash = location.hash.replace('#', '');
        navFunc(e,false,hash)
    }
}

document.addEventListener("DOMContentLoaded", app.init);

const navFunc = (e,current = false, target) => {
    e.preventDefault()
    document.querySelector('.active').classList.remove('active');
    document.getElementById(target).classList.add('active');
    console.log(target)
    if(current) history.pushState({}, target, `#${target}`);
    
    document.getElementById(target).dispatchEvent(app.show)
}

