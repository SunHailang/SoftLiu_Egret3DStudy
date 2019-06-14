/*

__author__ = ""
__date__ = ""

*/

export default class resmanager extends paper.Behaviour
{
    private static instance:resmanager;

    static getInstance (): resmanager 
    {
        if (!resmanager.instance) 
        {
            resmanager.instance = new resmanager()
        }
        return this.instance
    }

    public GetTexture(name:string):void
    {
        
        
    }

}