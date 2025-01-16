import react from 'react';

const Footer=()=>
{
    const year=new Date();
    return(
        <footer>CopyRights &copy; {year.getFullYear()}</footer>
    )
}

export default Footer;