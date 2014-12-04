package br.org.mj.sislegis.app.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import br.org.mj.sislegis.app.model.OrigemElaboracaoNormativa;

/**
 * 
 */
@Stateless
@Path("/origemelaboracaonormativas")
public class OrigemElaboracaoNormativaEndpoint
{
   @PersistenceContext(unitName = "sislegis-app-persistence-unit")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(OrigemElaboracaoNormativa entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(OrigemElaboracaoNormativaEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      OrigemElaboracaoNormativa entity = em.find(OrigemElaboracaoNormativa.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id") Long id)
   {
      TypedQuery<OrigemElaboracaoNormativa> findByIdQuery = em.createQuery("SELECT DISTINCT o FROM OrigemElaboracaoNormativa o WHERE o.id = :entityId ORDER BY o.id", OrigemElaboracaoNormativa.class);
      findByIdQuery.setParameter("entityId", id);
      OrigemElaboracaoNormativa entity;
      try
      {
         entity = findByIdQuery.getSingleResult();
      }
      catch (NoResultException nre)
      {
         entity = null;
      }
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      return Response.ok(entity).build();
   }

   @GET
   @Produces("application/json")
   public List<OrigemElaboracaoNormativa> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<OrigemElaboracaoNormativa> findAllQuery = em.createQuery("SELECT DISTINCT o FROM OrigemElaboracaoNormativa o ORDER BY o.id", OrigemElaboracaoNormativa.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<OrigemElaboracaoNormativa> results = findAllQuery.getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(OrigemElaboracaoNormativa entity)
   {
      try
      {
         entity = em.merge(entity);
      }
      catch (OptimisticLockException e)
      {
         return Response.status(Response.Status.CONFLICT).entity(e.getEntity()).build();
      }

      return Response.noContent().build();
   }
}