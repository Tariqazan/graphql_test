import graphene
from progress import schema


class Query(schema.Query,schema.QueryConvertedPdf,graphene.ObjectType):
    pass


class Mutation(schema.Mutation,graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query,mutation=Mutation)
