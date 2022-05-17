import json
from graphene_django.utils.testing import GraphQLTestCase


class MyFancyTestCase(GraphQLTestCase):
    def test_some_query(self):
        response = self.query(
            '''
            query {
                files {
                    id
                    file
                }
            }
            '''
        )

        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)


    def test_some_mutation(self):
        response = self.query(
            '''
            mutation fileUpload($file:Upload!){
                fileUpload(file:$file){
                    success{
                    id
                    file
                    }
                }
            }
            ''',
            input_data={"file":"file"},
            variables={'file': 'file'}
        )

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
