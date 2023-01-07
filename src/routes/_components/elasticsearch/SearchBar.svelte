<script>
    const { Client } = require('@elastic/elasticsearch')
    const client = new Client({
        cloud: { id: '<cloud-id>' },
        auth: { apiKey: 'base64EncodedKey' }
    })
</script>