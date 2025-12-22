from pydantic import BaseModel


class Thing(BaseModel):
    # Some heavy-weight object needed to support features in a specific languages
    language_engine: object
    # Some parameter for an internal algorithm
    algorithm_parameter: int


class GermanThing(Thing):
    language_engine: object = object()  # initialize the engine for DE here


class SimpleThing(Thing):
    algorithm_parameter: int = 0


class SimpleGermanThing(SimpleThing, GermanThing):
    pass


x = SimpleGermanThing()
