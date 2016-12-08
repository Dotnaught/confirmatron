validateEmailVerification = function(emailID, pfid)

    local verification_url = "https://api.sendgrid.com/v3/mail/send"

    local headers = {}
    headers["Authorization"] = "YOUR_SENDGRID_KEY_GOES_HERE"
    headers["Content-Type"] = "application/json"

    local params = {}
    params.headers = headers
    
    local body = {}
    body.personalizations ={}

    body.personalizations[1] ={}
    body.personalizations[1].to = {}
    body.personalizations[1].to[1] = {}
    body.personalizations[1].to[1].email = emailID
    body.personalizations[1].subject = "Verification link from YOUR_TITLE_GOES_HERE"
    body.from = {}
    body.from.email = "YOUR_FROM_EMAIL_ADDRESS_GOES HERE"

    local content = {}
    content[1] = {}
    content[1].type = "text/html"
    content[1].value = "<a href='URL_FOR_YOUR_NODE_APP" .. "?id=" .. pfid .. "'>Verify</a>"
    body.content = content

    params.body = json.encode(body)

    local function handleResponseForPost (event)
        if not event.isError then
            local response = json.decode( event.response )
            print("resonse on verification post:" .. event.response )
        else
            print( "Error on verification post" )
        end
        return
    end

    network.request( verification_url, "POST", handleResponseForPost, params)

end