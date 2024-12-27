function CreateConfig(name:string){
    
    if(FS.exists(name)){

    }
}

function init():void{
    //if(FS.exists(""))
}

const ConfigManager = {
    CreateConfig: CreateConfig,
}

export { 
    ConfigManager
}