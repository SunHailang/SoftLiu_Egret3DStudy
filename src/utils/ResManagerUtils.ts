/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-07-01"
 * 
 * 
 */

export default class ResManagerUtils extends paper.Behaviour
{
    private static instance:ResManagerUtils;

    static getInstance (): ResManagerUtils 
    {
        if (!ResManagerUtils.instance) 
        {
            ResManagerUtils.instance = new ResManagerUtils()
        }
        return this.instance
    }

    public GetTexture(name:string):void
    {
        
        
    }

}