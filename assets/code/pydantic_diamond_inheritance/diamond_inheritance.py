from pydantic import BaseModel


class BaseA(BaseModel):
    a: int


class BaseBC(BaseModel):
    b: int
    c: int


class Xa(BaseModel):
    a: int = 1


class Ybc(BaseModel):
    b: int = 2
    c: int = 3


class BaseABC(BaseA, BaseBC):
    def sum(self) -> int:
        return self.a + self.b + self.c

    pass


class Base(BaseModel):
    a: int
    b: int
    c: int

    def sum(self) -> int:
        return self.a + self.b + self.c


class SurfaceABC(Xa, Ybc, Base):
    pass


class X(Base):
    a: int = 1


class Y(Base):
    b: int = 2
    c: int = 3


class Surface(X, Y):
    pass


x = Surface.model_construct()
print(x.model_dump())
x = SurfaceABC()
print(x.model_dump())
print(x.sum())
