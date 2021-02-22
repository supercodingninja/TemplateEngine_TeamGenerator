const path = require('path');
const fs = require('fs');

const templatesDir = path.resolve(__dirname, '../templates');

const render = employees => {
  
  const html = [];

  html.push(...employees
    
    .filter(employee => employee.findRole() === 'Manager')
    
    .map(manager => renderManager(manager))
  );
  
  html.push(...employees
    
    .filter(employee => employee.findRole() === 'Engineer')
    
    .map(engineer => renderEngineer(engineer))
  );

  html.push(...employees
    
    .filter(employee => employee.findRole() === 'Intern')
    
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(''));
};


const renderManager = manager => {
  
  let template = fs.readFileSync(path.resolve(templatesDir, 'manager.html'), 'utf8');
  
  template = replacePlaceholders(template, 'name', manager.findName());
  
  template = replacePlaceholders(template, 'role', manager.findRole());
  
  template = replacePlaceholders(template, 'email', manager.findEmail());
  
  template = replacePlaceholders(template, 'id', manager.retrieveId());
  
  template = replacePlaceholders(template, 'deskNumber', manager.findDN());
  
  return template;
};


const renderEngineer = engineer => {
  
  let template = fs.readFileSync(path.resolve(templatesDir, 'engineer.html'), 'utf8');
  
  template = replacePlaceholders(template, 'name', engineer.findName());
  
  template = replacePlaceholders(template, 'role', engineer.findRole());
  
  template = replacePlaceholders(template, 'email', engineer.findEmail());
  
  template = replacePlaceholders(template, 'id', engineer.findId());
  
  template = replacePlaceholders(template, 'Github', engineer.findGithubProfile());
  
  return template;
};


const renderIntern = intern => {
  
  let template = fs.readFileSync(path.resolve(templatesDir, 'intern.html'), 'utf8');
  
  template = replacePlaceholders(template, 'name', intern.findName());
  
  template = replacePlaceholders(template, 'role', intern.findRole());
  
  template = replacePlaceholders(template, 'email', intern.findEmail());
  
  template = replacePlaceholders(template, 'id', intern.findId());
  
  template = replacePlaceholders(template, 'university', intern.findUniversity());
  
  return template;
};


const renderMain = html => {
  
  const template = fs.readFileSync(path.resolve(templatesDir, 'main.html'), 'utf8');
  
  return replacePlaceholders(template, 'team', html);
};


const replacePlaceholders = (template, placeholder, value) => {
  
  const pattern = new RegExp('{{ ' + placeholder + ' }}', 'gm');
  
  return template.replace(pattern, value);
};

module.exports = render;